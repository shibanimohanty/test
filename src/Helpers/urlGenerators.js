const urlGenerator = (baseUrl, tempUrl, params) => {
    let url = new URL(tempUrl, baseUrl);
    let objectProperties = params ? Object.entries(params) : [];
    if (objectProperties.length > 0) {
        objectProperties.map(([key, value]) => {
            url.searchParams.append(key, value);
            return [key, value];
        })
    }
    return url;
}

export default urlGenerator;