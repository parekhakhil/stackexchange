from rest_framework.throttling import AnonRateThrottle


class PerMinThrottle(AnonRateThrottle):
    scope = "anon_min"


class PerDayThrottle(AnonRateThrottle):
    scope = "anon_day"
