from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import json
from handler import lambda_handler

app = FastAPI()

@app.post("/event")
async def handle_event(request: Request):
    try:
        event = await request.json()
        print("Received event:", json.dumps(event, indent=2))
        result = lambda_handler(event)
        return JSONResponse(content=json.loads(result["body"]), status_code=result["statusCode"])
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.get("/health")
def health_check():
    try:
        return {"health": "ok"}
    except Exception as e:
        return f"Unhealthy: {str(e)}"
