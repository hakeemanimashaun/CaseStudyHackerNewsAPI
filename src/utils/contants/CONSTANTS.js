

export const CONSTANTS = {
    hackerNewsURL: `https://hn.algolia.com/api/v1/search_by_date?numericFilters=points%3E250&page=`,
    linkdinURL: "https://www.linkedin.com/in/hakeem-animashaun-b1600715a",
    githubURL: "https://github.com/hakeemanimashaun?tab=repositories"
}

export const ERRORS = {
    deleteMessage: 'delete successful',
    emailError: 'Please fill email',
    passwordError: 'Please enter password digits',
}

export const QUERIES = {
    SelectHome: 'SELECT email, password FROM Users',
    deleteHome: 'DELETE FROM Users',
    insertLogin: 'INSERT INTO Users (email, password) VALUES (?,?)',
    selectLogin:'SELECT email, password FROM Users',

}