window.onload = function() {
    const filename1 = document.getElementById("filename1");
    const filename2 = document.getElementById("filename2");
    const filename3 = document.getElementById("filename3");
    const filename4 = document.getElementById("filename4");
    const filename5 = document.getElementById("filename5");
    filename1.onchange = evt => {
        const [file] = filename1.files;
        if (file) {
            img1.src = URL.createObjectURL(file);
        };
    };
    filename2.onchange = evt => {
        const [file] = filename2.files;
        if (file) {
            img2.src = URL.createObjectURL(file);
        };
    };
    filename3.onchange = evt => {
        const [file] = filename3.files;
        if (file) {
            img3.src = URL.createObjectURL(file);
        };
    };
    filename4.onchange = evt => {
        const [file] = filename4.files;
        if (file) {
            img4.src = URL.createObjectURL(file);
        };
    };
    filename5.onchange = evt => {
        const [file] = filename5.files;
        if (file) {
            img5.src = URL.createObjectURL(file);
        };
    };
};
