"use client";
import React, { useEffect, useRef } from 'react';
import * as WEBIFC from 'web-ifc';
import * as BUI from '@thatopen/ui';
import Stats from 'stats.js';
import * as OBC from "@thatopen/components"; // Update this path as necessary

const ModelViewer = () => {
    const containerRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        // Ensure the code only runs in the browser
        if (typeof window === 'undefined' || !containerRef.current) return;

        const components = new OBC.Components();
        const worlds = components.get(OBC.Worlds);

        const world = worlds.create();
        world.scene = new OBC.SimpleScene(components);
        world.renderer = new OBC.SimpleRenderer(components, containerRef.current);
        world.camera = new OBC.SimpleCamera(components);

        components.init();

        world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);
        world.scene.setup();

        const grids = components.get(OBC.Grids);
        grids.create(world);

        const fragments = components.get(OBC.FragmentsManager);
        const fragmentIfcLoader = components.get(OBC.IfcLoader);

        (async () => {
            await fragmentIfcLoader.setup();

            const excludedCats = [
                WEBIFC.IFCTENDONANCHOR,
                WEBIFC.IFCREINFORCINGBAR,
                WEBIFC.IFCREINFORCINGELEMENT,
            ];

            for (const cat of excludedCats) {
                fragmentIfcLoader.settings.excludedCategories.add(cat);
            }

            fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
            fragmentIfcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;

            async function loadIfc() {
                const file = await fetch("https://thatopen.github.io/engine_components/resources/small.ifc");
                //const file = await fetch("C:\\Users\\atoms\\Desktop\\IFC Model\\RM1-EMS-ZZ-ZZ-MDM-V23-ME-240311.ifc")
                const data = await file.arrayBuffer();
                const buffer = new Uint8Array(data);
                const model = await fragmentIfcLoader.load(buffer);
                model.name = "example";
                world.scene.three.add(model);
            }

            function download(file) {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(file);
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                link.remove();
            }

            async function exportFragments() {
                if (!fragments.groups.size) {
                    return;
                }
                const group = Array.from(fragments.groups.values())[0];
                const data = fragments.export(group);
                download(new File([new Blob([data])], "small.frag"));

                const properties = group.getLocalProperties();
                if (properties) {
                    download(new File([JSON.stringify(properties)], "small.json"));
                }
            }

            function disposeFragments() {
                fragments.dispose();
            }

            statsRef.current = new Stats();
            statsRef.current.showPanel(2);
            document.body.append(statsRef.current.dom);
            statsRef.current.dom.style.left = "0px";

            if (world.renderer) {
                world.renderer.onBeforeUpdate.add(() => statsRef.current?.begin());
                world.renderer.onAfterUpdate.add(() => statsRef.current?.end());
            } else {
                console.error("world.renderer is not initialized");
            }

            BUI.Manager.init();

            const panel = BUI.Component.create(() => {
                return BUI.html`
          <bim-panel active label="IFC Loader" style="position: fixed; top: 5px; right: 5px">
            <bim-panel-section style="padding-top: 12px;">
              <bim-button label="Load IFC" @click="${() => { loadIfc(); }}"></bim-button>  
              <bim-button label="Export fragments" @click="${() => { exportFragments(); }}"></bim-button>  
              <bim-button label="Dispose fragments" @click="${() => { disposeFragments(); }}"></bim-button>
            </bim-panel-section>
          </bim-panel>
        `;
            });

            document.body.append(panel);

            fragments.onFragmentsLoaded.add((model) => {
                console.log(model);
            });

        })();

        return () => {
            if (statsRef.current) {
                document.body.removeChild(statsRef.current.dom);
            }
            components.dispose();
        };
    }, []);

    return (
        <div id="container" ref={containerRef} style={{ width: '100%', height: '100%' }}>

        </div>


    );

};

export default ModelViewer;
