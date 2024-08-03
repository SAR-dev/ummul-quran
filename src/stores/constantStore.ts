export const constants = {
    THEME_STORE_KEY: "theme",
    JWT_AUTH_KEY: "auth",
    EMAIL_PATTERN_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    AUTH_KEY_SIZE: 8,
    REGEX_PATTERN: {
        EMAIL: new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    },
    QUERY_KEYS: {
        TEACHER_LIST: "teacher-list",
        PACKAGE_LIST: "package-list",
        STUDENT_LIST_BY_TEACHER: "student-list-by-teacher",
    }
}