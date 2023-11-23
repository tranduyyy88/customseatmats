export function deleteCookie(cookiname) {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    var expires = ";expires=" + d;
    var value = "";
    document.cookie = cookiname + "=" + value + expires + "; path=/";
}