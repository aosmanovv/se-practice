from fractions import Fraction
from math import floor


def _is_real_number(value):
    """True for int/float, False for bool and everything else."""
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def _round_half_up_2dp(value):
    """Round a non-negative Fraction to 2 decimal places, halves rounding up."""
    hundredths = floor(value * 100 + Fraction(1, 2))
    return hundredths / 100


def analyze_marks(marks, pass_mark=50):
    if len(marks) == 0:
        raise ValueError("marks must not be empty")

    for m in marks:
        if not _is_real_number(m):
            raise ValueError(f"mark {m!r} is not a real number")
        if not (0 <= m <= 100):  # also False for NaN
            raise ValueError(f"mark {m!r} is outside the range 0-100")

    n = len(marks)
    total = sum(Fraction(repr(m)) for m in marks)
    passed = sum(1 for m in marks if m >= pass_mark)

    return {
        "average": _round_half_up_2dp(total / n),
        "highest": max(marks),
        "lowest": min(marks),
        "pass_rate": _round_half_up_2dp(Fraction(passed * 100, n)),
    }