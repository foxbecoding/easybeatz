interface ApiData {
    data?:object
    isMultiPart?: boolean
    method: "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE"
    path: string
}

export default ApiData