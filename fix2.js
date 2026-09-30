const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const strToRemove = `            let nodesMap = new Map();

            function collectElements(obj, idMap) {
                if (!obj || typeof obj !== 'object') return;

                if (Array.isArray(obj)) {
                    obj.forEach(x => collectElements(x, idMap));
                    return;
                }

                // Track objects by their object identity to avoid double-processing
                if (idMap.has(obj)) return;
                idMap.add(obj);

                // If it's a node
                if (obj.labels !== undefined && obj.properties !== undefined && obj.edges !== undefined) {
                    let propStr = JSON.stringify(obj.properties);
                    let labelStr = obj.labels.join(':');
                    let displayLabel = (labelStr ? ':' + labelStr + '\n' : '') + propStr;

                    // The WASM output doesn't seem to have explicit node IDs in the JSON payload natively unless id() is queried.
                    // But edges have start and end IDs.
                    // We need a way to correlate nodes.
                    // For now, nodesData will just generate a random ID if we don't have one, but we MUST
                    // be able to link edges.

                    // Actually, let's look at the WASM output:
                    // nodes don't have explicit IDs in the JSON unless we find a way to map them.
                    // Wait, edges have start=0, end=1. Are these array indices? Or internal IDs?
                    // Internal IDs. But the JSON object for the node itself doesn't contain its own ID!
                    // This means we CANNOT reliably link the node object in the JSON to the edge object in the JSON unless we parse them intelligently or if the edge ID is enough.

                    // Let's just create nodes based on edges for now!
                    // And add free-floating nodes if they have an ID.
                }

                // Check if it's an edge
                if (obj.start !== undefined && obj.end !== undefined) {
                    const edgeId = obj.start + "-" + obj.end;
                    if (!nodesData.get(obj.start)) {
                        nodesData.add({ id: obj.start, label: 'Node ' + obj.start });
                    }
                    if (!nodesData.get(obj.end)) {
                        nodesData.add({ id: obj.end, label: 'Node ' + obj.end });
                    }
                    if (!edgesData.get(edgeId)) {
                        let labelText = obj.type || '';
                        let props = obj.properties && Object.keys(obj.properties).length > 0 ? JSON.stringify(obj.properties) : '';
                        edgesData.add({
                            id: edgeId,
                            from: obj.start,
                            to: obj.end,
                            label: labelText + (props ? '\n' + props : ''),
                            title: JSON.stringify(obj)
                        });
                    }
                } else if (obj.labels !== undefined && obj.properties !== undefined && obj.edges !== undefined) {
                     let propStr = JSON.stringify(obj.properties);
                    let labelStr = obj.labels.join(':');
                    let displayLabel = (labelStr ? ':' + labelStr + '\n' : '') + propStr;

                    let found = false;
                    nodesData.forEach(n => {
                        // Very naive deduplication for demo purposes
                        if (n.title === displayLabel || n.label === displayLabel) found = true;
                    });

                    if (!found) {
                        let randId = "node_" + Math.random().toString(36).substring(7);
                        nodesData.add({
                            id: randId,
                            label: displayLabel,
                            title: displayLabel
                        });
                    }
                }

                Object.values(obj).forEach(x => collectElements(x, idMap));
            }`;

if (content.indexOf(strToRemove) > -1) {
    content = content.replace(strToRemove, '');
    fs.writeFileSync('index.html', content);
    console.log("Fixed!");
} else {
    console.log("Could not find string");
}
