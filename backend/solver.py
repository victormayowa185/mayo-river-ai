def is_valid(state):
    m, c, boat = state
    if m < 0 or c < 0 or m > 3 or c > 3:
        return False
    if m > 0 and c > m:
        return False
    right_m = 3 - m
    right_c = 3 - c
    if right_m > 0 and right_c > right_m:
        return False
    return True

def get_neighbors(state):
    m, c, boat = state
    neighbors = []
    moves = [(1,0), (2,0), (0,1), (0,2), (1,1)]  # (missionaries, cannibals)

    for move_m, move_c in moves:
        if boat == 0:  # boat on left, people leave left bank
            new_m = m - move_m
            new_c = c - move_c
        else:          # boat on right, people return to left bank
            new_m = m + move_m
            new_c = c + move_c

        new_boat = 1 - boat
        new_state = (new_m, new_c, new_boat)

        if is_valid(new_state):
            neighbors.append(new_state)

    return neighbors

def bfs(start, goal):
    queue = [start]
    visited = {start}
    parent = {start: None}

    while queue:
        current = queue.pop(0)

        if current == goal:
            path = []
            while current:
                path.append(current)
                current = parent[current]
            return path[::-1]

        for neighbor in get_neighbors(current):
            if neighbor not in visited:
                visited.add(neighbor)
                parent[neighbor] = current
                queue.append(neighbor)

    return None



def dfs(start, goal):
    stack = [start]
    visited = {start}
    parent = {start: None}

    while stack:
        current = stack.pop()      # <-- pop the last item (stack behavior)

        if current == goal:
            path = []
            while current:
                path.append(current)
                current = parent[current]
            return path[::-1]

        for neighbor in get_neighbors(current):
            if neighbor not in visited:
                visited.add(neighbor)
                parent[neighbor] = current
                stack.append(neighbor)

    return None

def solve(algorithm):
    start = (3, 3, 0)
    goal = (0, 0, 1)

    if algorithm == "bfs":
        return bfs(start, goal)
    elif algorithm == "dfs":
        return dfs(start, goal)
    else:
        return None