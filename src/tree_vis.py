from anytree import Node, RenderTree
from anytree.exporter import DotExporter
from typing import Dict, List
import io
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def build_commit_tree(data: Dict) -> Node:
    commits = {commit['sha']: commit for commit in data['commits']}
    relationships = data['relationships']

    for sha, commit in commits.items():
        print(f"Processing commit: SHA={sha}, Parents={commit['parents']}, Message='{commit['message']}'")

    if not commits:
        logger.error("No commits found in the repository data")
        raise ValueError("No commits found in the repository data")

    # Use the first commit as the root if there's no commit without parents
    root_sha = next(iter(commits))
    logger.info(f"Using commit {root_sha} as the root")

    def build_tree(sha: str, parent=None, processed=None) -> Node:
        if processed is None:
            processed = set()
        
        if sha in processed:
            return None

        processed.add(sha)
        commit = commits[sha]
        node = Node(f"{sha[:7]}: {commit['message']}", parent=parent)
        
        for rel in relationships:
            if rel['to'] == sha:
                child = build_tree(rel['from'], parent=node, processed=processed)
                if child:
                    node.children += (child,)
        
        return node
    
    return build_tree(root_sha)

def generate_tree_visualization(root: Node) -> str:
    tree_viz = io.StringIO()
    for pre, _, node in RenderTree(root):
        tree_viz.write(f"{pre}{node.name}\n")
    return tree_viz.getvalue()

def export_tree_to_dot(root: Node, filename: str = "tree.dot"):
    DotExporter(root).to_dotfile(filename)
    return filename

def process_repo_data(data: Dict) -> Dict:
    root = build_commit_tree(data)
    tree_visualization = generate_tree_visualization(root)
    dot_filename = export_tree_to_dot(root)
    
    return {
        "original_data": data,
        "tree_visualization": tree_visualization,
        "dot_file": dot_filename
    }
