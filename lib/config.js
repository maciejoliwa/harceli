/*
    Returns true if the configuration file is valid, returns false otherwise
*/
function validateConfigurationObject(obj) {
    if (!obj.hasOwnProperty("watched")) {
        return false;
    }

    let results = false;

    const { watched } = obj;

    watched.forEach(recipe => {
        if (  // Here we check if every recipe is an object
            typeof(recipe) === "object" &&
            !Array.isArray(recipe) &&
            recipe !== null
        ) {
            if (
                (typeof(recipe.files) === "string" || Array.isArray(recipe.files)) &&
                typeof(recipe.on_write) === "string" 
            ) {
                results = true;
            } else {
                results = false;
            }
        }
    });

    return results;
}

export {
    validateConfigurationObject
}