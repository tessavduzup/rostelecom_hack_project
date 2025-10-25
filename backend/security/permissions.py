# security.py
from enum import Enum
from typing import List


class Permission(str, Enum):
    # Проекты
    PROJECT_READ = "projects:read"
    PROJECT_WRITE = "projects:write"
    PROJECT_DELETE = "projects:delete"

    # Отчеты
    REPORT_READ = "reports:read"
    REPORT_CREATE = "reports:create"
    REPORT_EXPORT = "reports:export"

    # Аналитика
    ANALYTICS_READ = "analytics:read"
    ANALYTICS_WRITE = "analytics:write"

    # Администрирование
    USER_MANAGE = "users:manage"
    REFERENCE_MANAGE = "references:manage"
    SYSTEM_MANAGE = "system:manage"


# Ролевая модель с разрешениями
ROLE_PERMISSIONS = {
    "user": [
        Permission.PROJECT_READ,
        Permission.PROJECT_WRITE,
        Permission.REPORT_READ,
    ],
    "analyst": [
        Permission.PROJECT_READ,
        Permission.PROJECT_WRITE,
        Permission.REPORT_READ,
        Permission.REPORT_CREATE,
        Permission.REPORT_EXPORT,
        Permission.ANALYTICS_READ,
        Permission.ANALYTICS_WRITE,
    ],
    "admin": [
        Permission.PROJECT_READ,
        Permission.PROJECT_WRITE,
        Permission.PROJECT_DELETE,
        Permission.REPORT_READ,
        Permission.REPORT_CREATE,
        Permission.REPORT_EXPORT,
        Permission.ANALYTICS_READ,
        Permission.ANALYTICS_WRITE,
        Permission.USER_MANAGE,
        Permission.REFERENCE_MANAGE,
        Permission.SYSTEM_MANAGE,
    ]
}