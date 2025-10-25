from enum import Enum

class Permission(str, Enum):
    # Проекты
    PROJECT_READ = "projects:read"
    PROJECT_WRITE = "projects:write"
    PROJECT_DELETE = "projects:delete"
    # Отчеты
    REPORT_READ = "reports:read"
    REPORT_CREATE = "reports:create"
    REPORT_EXPORT = "reports:export"

    # Администрирование
    USER_MANAGE = "users:manage"
    SYSTEM_MANAGE = "system:manage"

# Ролевая модель с разрешениями
ROLE_PERMISSIONS = {
    "manager": [
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
    ],
    "admin": [
        Permission.PROJECT_READ,
        Permission.PROJECT_WRITE,
        Permission.PROJECT_DELETE,
        Permission.REPORT_READ,
        Permission.REPORT_CREATE,
        Permission.REPORT_EXPORT,
        Permission.USER_MANAGE,
        Permission.SYSTEM_MANAGE,
    ]
}