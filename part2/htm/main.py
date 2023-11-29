from fastapi import fastapi
from fastapi.responses import FileResponse

app = FastAPI()

@app.get("/")
def one():
    return FileResponse('D:\htm\one.html')

@app.get("/data")
def data():
    return{ 'hello': 1234}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8080)
