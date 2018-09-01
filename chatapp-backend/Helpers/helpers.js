/*
* Created By Suyash Tiwari
* on 5 August 2018
*/

module.exports = {
    firstUpper: username => {
        const name = username.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1);
    },

    lowerCase: str => {
        return str.toLowerCase();
    }
};