from flask import Flask, request, jsonify
import solver

app = Flask(__name__)

@app.route('/solve', methods=['POST'])
def solve():
    # Try to get data as JSON first; if that fails, fall back to form data
    if request.is_json:
        data = request.get_json()
        algo = data.get('algorithm', 'bfs')
    else:
        algo = request.form.get('algorithm', 'bfs')

    if algo not in ('bfs', 'dfs'):
        return jsonify({"error": "Algorithm must be 'bfs' or 'dfs'"}), 400

    path = solver.solve(algo)

    if path is None:
        return jsonify({"error": "No solution found"}), 404

    steps = []
    for i, state in enumerate(path):
        m, c, boat = state
        steps.append({
            "step": i,
            "left_missionaries": m,
            "left_cannibals": c,
            "boat": "left" if boat == 0 else "right"
        })

    return jsonify({
        "algorithm": algo,
        "solution": steps,
        "message": "Solution found"
    })
@app.route('/')
def home():
    return '''
    <h2>Missionaries & Cannibals Solver</h2>
    <form method="POST" action="/solve">
      <label>Algorithm: 
        <select name="algorithm">
          <option value="bfs">BFS</option/
__pycache__/
*.pycon>
          <option value="dfs">DFS</option>
        </select>
      </label>
      <button type="submit">Solve</button>
    </form>
    <p><em>Send a POST request to /solve with JSON {"algorithm":"bfs"} for API.</em></p>
    '''

if __name__ == '__main__':
    app.run(debug=True)