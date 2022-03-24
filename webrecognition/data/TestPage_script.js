window.onload = function() {
    const imgInp = document.getElementById("imgInp");
    imgInp.onchange = evt => {
        const [file] = imgInp.files;
        if (file) {
            blah.src = URL.createObjectURL(file);
        };
    };
};
