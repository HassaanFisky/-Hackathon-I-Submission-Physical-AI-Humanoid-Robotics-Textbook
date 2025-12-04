from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json

app = FastAPI(
    title="Physical AI Textbook RAG API",
    description="RAG chatbot for answering questions about Physical AI & Humanoid Robotics",
    version="1.0.0"
)

# Enable CORS for Docusaurus site
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str
    selected_text: Optional[str] = ""

class QueryResponse(BaseModel):
    answer: str
    source: str

# Simulated knowledge base (in production, this would be Qdrant + Neon)
KNOWLEDGE_BASE = {
    "physical_ai": "Physical AI represents embodied intelligence that interacts directly with the physical world, using sensors and actuators to perceive and act in real-time environments.",
    "humanoid_robots": "Humanoid robots like Tesla Optimus, Boston Dynamics Atlas, and Figure 01 are designed to resemble humans and operate in human-centered environments.",
    "ros2": "ROS 2 (Robot Operating System) is middleware for robot control, providing nodes, topics, and services for communication.",
    "sensors": "Modern robots use vision systems (cameras, LiDAR), proprioceptive sensors (encoders, IMUs), and tactile sensors for environmental awareness.",
    "kinematics": "Forward kinematics calculates end effector position from joint angles, while inverse kinematics determines required joint angles for desired positions."
}

@app.get("/")
async def root():
    return {
        "message": "Physical AI Textbook RAG API",
        "status": "operational",
        "endpoints": ["/health", "/ready", "/query"]
    }

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.get("/ready")
async def ready():
    """Readiness check - verifies dependencies"""
    return {
        "status": "ready",
        "dependencies": {
            "qdrant": "stub (use QDRANT_URL env var for real)",
            "neon": "stub (use NEON_DATABASE_URL env var for real)",
            "openai": "stub (use OPENAI_API_KEY env var for real)"
        }
    }

@app.post("/query", response_model=QueryResponse)
async def query(request: QueryRequest):
    """
    RAG query endpoint that answers based on selected text only.
    
    If selected_text is provided, the answer is constrained to that context.
    Otherwise, it searches the knowledge base.
    """
    query_lower = request.query.lower()
    
    if request.selected_text:
        # Selection-based RAG: answer only from selected text
        # This is the key requirement from the hackathon
        answer = f"Based on your selection: {request.selected_text[:200]}... "
        answer += f"In response to '{request.query}': "
        
        # Simple keyword matching in selection
        if "physical ai" in query_lower and "physical ai" in request.selected_text.lower():
            answer += "Physical AI refers to embodied intelligence systems as described in your selected text."
        elif "robot" in query_lower:
            answer += "The selected text discusses robotic systems and their capabilities."
        else:
            answer += "The selected text provides relevant context for your question."
            
        return QueryResponse(
            answer=answer,
            source="selected_text"
        )
    else:
        # Knowledge base RAG (fallback if no selection)
        answer = "No text selected. Please select text from the book for context-aware answers. "
        
        # Try to match query to knowledge base
        for key, value in KNOWLEDGE_BASE.items():
            if key in query_lower:
                answer = value
                return QueryResponse(answer=answer, source="knowledge_base")
        
        return QueryResponse(
            answer="Please select text from the book to get accurate answers based on the specific context you're reading.",
            source="none"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
