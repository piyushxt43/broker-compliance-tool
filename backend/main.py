
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime, timedelta
import random

app = FastAPI()

# Allow local frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"]
,
    allow_headers=["*"]
)


class MetricPoint(BaseModel):
    name: str
    trades: int
    alerts: int


def _generate_week_metrics() -> List[MetricPoint]:
    weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    base_trades = random.randint(220, 360)
    points: List[MetricPoint] = []
    for i, day in enumerate(weekdays):
        trades_today = max(100, int(random.gauss(base_trades + i * 10, 40)))
        alerts_today = max(0, int(random.gauss(2, 1)))
        points.append(MetricPoint(name=day, trades=trades_today, alerts=alerts_today))
    return points


@app.get("/metrics", response_model=List[MetricPoint])
def get_metrics():
    return _generate_week_metrics()

@app.get("/compliance")
def compliance_checks():
    # Simplified heuristic checks a small broker might monitor daily
    checks = []
    net_capital_ok = random.random() > 0.05
    checks.append(f"Net Capital Adequacy: {'OK' if net_capital_ok else 'Review Required'}")

    turnover_within = random.random() > 0.1
    checks.append(f"Client-wise Turnover Limits: {'Within Range' if turnover_within else 'Breached'}")

    sebi_filing_done = random.random() > 0.02
    checks.append(f"Regulatory Filings (SEBI/Exchange): {'Submitted' if sebi_filing_done else 'Pending'}")

    kyc_refresh_on_time = random.random() > 0.15
    checks.append(f"KYC/CKYC Periodic Update: {'On Time' if kyc_refresh_on_time else 'Overdue'}")

    aml_training = random.random() > 0.1
    checks.append(f"AML Training (Staff): {'Completed' if aml_training else 'Due'}")

    return checks

@app.get("/surveillance")
def surveillance_alerts():
    alerts: List[str] = []
    if random.random() < 0.3:
        alerts.append("High frequency trading pattern on Client CL123 (z-score > 2.5)")
    if random.random() < 0.25:
        alerts.append("Circular trading suspicion between CL221, CL337, CL991")
    if random.random() < 0.2:
        alerts.append("Price ramping pattern in symbol ABC during last 30 mins")
    if random.random() < 0.15:
        alerts.append("MTM loss breach on Client CL555; margin shortfall risk")
    if not alerts:
        alerts.append("No material alerts in the last scan window")
    return alerts

@app.get("/report")
def generate_report():
    metrics = _generate_week_metrics()
    total_trades = sum(m.trades for m in metrics)
    total_alerts = sum(m.alerts for m in metrics)
    checks = compliance_checks()
    surve = surveillance_alerts()

    report_lines = [
        "Compliance & Surveillance Weekly Report",
        f"Generated: {datetime.utcnow().isoformat()}Z",
        "",
        f"Trades (week): {total_trades}",
        f"Alerts (week): {total_alerts}",
        "",
        "Compliance Checks:",
    ]
    report_lines.extend([f"- {c}" for c in checks])
    report_lines.extend(["", "Surveillance Alerts:"])
    report_lines.extend([f"- {a}" for a in surve])
    return "\n".join(report_lines)
