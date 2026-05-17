import pandas as pd

def get_student_data():
    df = pd.read_csv("students.csv")

    df["Total"] = df["Math"] + df["Science"] + df["English"]
    df["Average"] = round(df["Total"] / 3, 2)

    def grade(avg):
        if avg >= 90:
            return "A"
        elif avg >= 75:
            return "B"
        elif avg >= 50:
            return "C"
        else:
            return "Fail"

    df["Grade"] = df["Average"].apply(grade)

    return df.to_dict(orient="records")