//@input Asset.ObjectPrefab commitNode
//@input Asset.ObjectPrefab graphEdge

function onTrigger() {
  text = "{\"original_data\":{\"branches\":[{\"name\":\"main\",\"sha\":\"21e89915fecad3c648d2d5c5b1570305f133cdcd\"},{\"name\":\"not-vite-version\",\"sha\":\"2ac79a6adf7e21db99625bbe3d7a008d3e2252be\"}],\"commits\":[{\"sha\":\"21e89915fecad3c648d2d5c5b1570305f133cdcd\",\"message\":\"Update README.md\",\"author\":\"Rohan Virmani\",\"date\":\"2024-04-25T00:54:05Z\",\"parents\":[\"276eea2c7e45d7edb3bb19c057b2711a833f9908\"]},{\"sha\":\"276eea2c7e45d7edb3bb19c057b2711a833f9908\",\"message\":\"update README\",\"author\":\"Rohan Virmani\",\"date\":\"2024-04-21T21:55:02Z\",\"parents\":[\"8f86ffd2f31d216c784b0ef4d85297e5c0f58352\"]},{\"sha\":\"8f86ffd2f31d216c784b0ef4d85297e5c0f58352\",\"message\":\"imgs dir and fixed pahts\",\"author\":\"Rohan Virmani\",\"date\":\"2024-04-21T21:52:53Z\",\"parents\":[\"a6e1a1849b4aedeaf1984d36f7c64f30b246ce69\"]},{\"sha\":\"a6e1a1849b4aedeaf1984d36f7c64f30b246ce69\",\"message\":\"imgs dir\",\"author\":\"Rohan Virmani\",\"date\":\"2024-04-21T21:49:05Z\",\"parents\":[\"b182b68b1da3b02aca84800f392f33ac82d0cefb\"]},{\"sha\":\"b182b68b1da3b02aca84800f392f33ac82d0cefb\",\"message\":\"quick refactor going to add randomize curry photo later\",\"author\":\"Rohan Virmani\",\"date\":\"2024-04-19T23:11:32Z\",\"parents\":[\"8c2c086d77d3b4eaa87033351561ea6a19daafd9\"]},{\"sha\":\"8c2c086d77d3b4eaa87033351561ea6a19daafd9\",\"message\":\"finished! refactor and get ready t train real model\",\"author\":\"Rohan Virmani\",\"date\":\"2024-04-18T02:34:01Z\",\"parents\":[\"033b213e429c407c0a56bc43a32215f7aa55a7ba\"]},{\"sha\":\"033b213e429c407c0a56bc43a32215f7aa55a7ba\",\"message\":\"ready to bundle?\",\"author\":\"Rohan Virmani\",\"date\":\"2024-04-17T21:10:51Z\",\"parents\":[\"52a462e56365daf5997e1aeab165695a32d3adf2\"]},{\"sha\":\"52a462e56365daf5997e1aeab165695a32d3adf2\",\"message\":\"added image processing logic, target image loading, and creating and styling for overlayed image\",\"author\":\"Rohan Virmani\",\"date\":\"2024-04-13T03:05:56Z\",\"parents\":[\"1b98c113a45fcd2b43f291c6c675c7eed1acb895\"]},{\"sha\":\"1b98c113a45fcd2b43f291c6c675c7eed1acb895\",\"message\":\"waiting for model training\",\"author\":\"Rohan Virmani\",\"date\":\"2024-04-12T22:41:10Z\",\"parents\":[\"b5b7265b2f1e9c005cb6a862b1f304d3ef6cf68f\"]},{\"sha\":\"b5b7265b2f1e9c005cb6a862b1f304d3ef6cf68f\",\"message\":\"first commit\",\"author\":\"Rohan Virmani\",\"date\":\"2024-04-11T17:17:28Z\",\"parents\":[]}],\"relationships\":[{\"from\":\"21e89915fecad3c648d2d5c5b1570305f133cdcd\",\"to\":\"276eea2c7e45d7edb3bb19c057b2711a833f9908\"},{\"from\":\"276eea2c7e45d7edb3bb19c057b2711a833f9908\",\"to\":\"8f86ffd2f31d216c784b0ef4d85297e5c0f58352\"},{\"from\":\"8f86ffd2f31d216c784b0ef4d85297e5c0f58352\",\"to\":\"a6e1a1849b4aedeaf1984d36f7c64f30b246ce69\"},{\"from\":\"a6e1a1849b4aedeaf1984d36f7c64f30b246ce69\",\"to\":\"b182b68b1da3b02aca84800f392f33ac82d0cefb\"},{\"from\":\"b182b68b1da3b02aca84800f392f33ac82d0cefb\",\"to\":\"8c2c086d77d3b4eaa87033351561ea6a19daafd9\"},{\"from\":\"8c2c086d77d3b4eaa87033351561ea6a19daafd9\",\"to\":\"033b213e429c407c0a56bc43a32215f7aa55a7ba\"},{\"from\":\"033b213e429c407c0a56bc43a32215f7aa55a7ba\",\"to\":\"52a462e56365daf5997e1aeab165695a32d3adf2\"},{\"from\":\"52a462e56365daf5997e1aeab165695a32d3adf2\",\"to\":\"1b98c113a45fcd2b43f291c6c675c7eed1acb895\"},{\"from\":\"1b98c113a45fcd2b43f291c6c675c7eed1acb895\",\"to\":\"b5b7265b2f1e9c005cb6a862b1f304d3ef6cf68f\"}]},\"tree_visualization\":\"b5b7265: first commit\\n\\u2514\\u2500\\u2500 1b98c11: waiting for model training\\n    \\u2514\\u2500\\u2500 52a462e: added image processing logic, target image loading, and creating and styling for overlayed image\\n        \\u2514\\u2500\\u2500 033b213: ready to bundle?\\n            \\u2514\\u2500\\u2500 8c2c086: finished! refactor and get ready t train real model\\n                \\u2514\\u2500\\u2500 b182b68: quick refactor going to add randomize curry photo later\\n                    \\u2514\\u2500\\u2500 a6e1a18: imgs dir\\n                        \\u2514\\u2500\\u2500 8f86ffd: imgs dir and fixed pahts\\n                            \\u2514\\u2500\\u2500 276eea2: update README\\n                                \\u2514\\u2500\\u2500 21e8991: Update README.md\\n\",\"dot_file\":\"tree.dot\"}";
  const json = JSON.parse(text);
    
  commits = json.original_data.commits;
  edges = json.original_data.relationships;
  
  dict = new Map();
  for (let i = 0; i < commits.length; i++) {
    commitObject = createCommitNode();
    commitPosition = new vec3(10 * i - commits.length * 5, 0, -commits.length * 5);
    commitObject.getTransform().setWorldPosition(commitPosition);
    dict.set(commits[i].sha, commitPosition);
  }
    
  for (let i = 0; i < edges.length; i++) {
    node1 = dict.get(edges[i].from);
    node2 = dict.get(edges[i].to);
    edgeObject = createGraphEdge();
    edgePosition = new vec3((node1.x + node2.x) / 2,
                            (node1.y + node2.y) / 2,
                            (node1.z + node2.z) / 2);
    edgeObject.getTransform().setWorldPosition(edgePosition);
  }
}
// Add our onTrigger() function as a response to the custom trigger "my_trigger"
//global.behaviorSystem.addCustomTriggerResponse('my_trigger', onTrigger);

function createCommitNode() {
  if (script.commitNode) {
    var instanceObject = script.commitNode.instantiate(script.getSceneObject());
    return instanceObject;
  } else {
    return undefined;
  }
}

function createGraphEdge() {
  if (script.graphEdge) {
    var instanceObject = script.graphEdge.instantiate(script.getSceneObject());
    return instanceObject;
  } else {
    return undefined;
  }
}

onTrigger();