def analyze_marks(marks, pass_mark=50):
    """
    Analyze a list of exam marks.

    Returns a dict with average, highest, lowest, and pass_rate (%).
    Raises ValueError for an empty list, non-numeric values, or values
    outside the 0-100 range.
    """
    if not marks:
        raise ValueError("marks list cannot be empty")

    for mark in marks:
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError(f"non-numeric mark found: {mark!r}")
        if mark < 0 or mark > 100:
            raise ValueError(f"mark out of range (0-100): {mark!r}")

    total = sum(marks)
    count = len(marks)
    passed = sum(1 for mark in marks if mark >= pass_mark)

    return {
        "average": total / count,
        "highest": max(marks),
        "lowest": min(marks),
        "pass_rate": (passed / count) * 100,
    }