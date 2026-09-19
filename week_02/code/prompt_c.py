def analyze_marks(marks, pass_mark=50):
    if not marks:
        raise ValueError("marks must be a non-empty list")

    for mark in marks:
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError(f"non-numeric mark found: {mark!r}")
        if mark < 0 or mark > 100:
            raise ValueError(f"mark out of range (0-100): {mark!r}")

    total = sum(marks)
    count = len(marks)
    average = round(total / count, 2)
    highest = max(marks)
    lowest = min(marks)
    pass_count = sum(1 for mark in marks if mark >= pass_mark)
    pass_rate = round((pass_count / count) * 100, 2)

    return {
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": pass_rate,
    }