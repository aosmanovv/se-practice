def analyze_marks(raw):
    valid = []
    for item in raw:
        try:
            number = float(item)
        except (ValueError, TypeError):
            continue
        if number < 0 or number > 100:
            continue
        valid.append(number)

    if len(valid) == 0:
        return None

    count = len(valid)
    average = sum(valid) / count
    highest = max(valid)
    lowest = min(valid)
    passed_count = sum(1 for m in valid if m >= 50)
    pass_rate = passed_count / count * 100

    return {
        "count": count,
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": pass_rate,
    }


def print_result(result):
    if result is None:
        print("No valid marks — cannot compute statistics.")
        return
    print(f"Valid marks: {result['count']}")
    print(f"Average: {result['average']:.2f}")
    print(f"Highest: {result['highest']:g}")
    print(f"Lowest: {result['lowest']:g}")
    print(f"Pass rate: {result['pass_rate']:.1f}%")


if __name__ == "__main__":
    case_A = ["85", "23", "45", "90", "92"]
    case_B = ["88", "47", "-5", "101", "abc", "73", "50", "", "100"]
    case_C = ["10", "20", "30"]
    case_D = ["abc", "", "xyz"]

    cases = [(case_A), (case_B), (case_C), (case_D)]

    for data in cases:
        result = analyze_marks(data)
        print_result(result)
        print()