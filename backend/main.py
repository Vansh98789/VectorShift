from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str


class Edge(BaseModel):
    source: str
    target: str


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    node_ids = {node.id for node in nodes}
    adjacency = {node_id: [] for node_id in node_ids}

    for edge in edges:
        if edge.source in adjacency:
            adjacency[edge.source].append(edge.target)

    # 0 = unvisited, 1 = in-stack, 2 = done
    state = {node_id: 0 for node_id in node_ids}

    def has_cycle(node_id: str) -> bool:
        state[node_id] = 1
        for neighbor in adjacency.get(node_id, []):
            if neighbor not in state:
                continue
            if state[neighbor] == 1:
                return True
            if state[neighbor] == 0 and has_cycle(neighbor):
                return True
        state[node_id] = 2
        return False

    for node_id in node_ids:
        if state[node_id] == 0:
            if has_cycle(node_id):
                return False
    return True


@app.get("/")
def read_root():
    return {"Health": "Ok"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": dag}
