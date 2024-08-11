export const constants = {
    THEME_STORE_KEY: "theme",
    JWT_AUTH_KEY: "auth",
    EMAIL_PATTERN_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    AUTH_KEY_SIZE: 8,
    REGEX_PATTERN: {
        EMAIL: new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
        TIME: new RegExp(/^([01]\d|2[0-3]):([0-5]\d)$/),
        DATE: new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/),
    },
    QUERY_KEYS: {
        TEACHER_LIST: "teacher-list",
        PACKAGE_LIST: "package-list",
        STUDENT_LIST_BY_TEACHER: "student-list-by-teacher",
        CLASS_LIST: "class-list",
    }
}