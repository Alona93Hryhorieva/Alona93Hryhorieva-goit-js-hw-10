// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const valueFulfilled = document.querySelector('input[value="fulfilled"]');
const btnSubmit = document.querySelector("[type=submit]");
const valueRejected = document.querySelector('input[value="rejected"]');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const delay = parseInt(formData.get("delay"), 10);
    const state = formData.get("state");

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise
    .then((delay) => {
        iziToast.success({
            title: '✅ Успіх',
            message: `✅ Fulfilled promise in${delay}ms`,
            position: 'topRight',
        });
    })
    .catch((delay) => {
        iziToast.error({
            title: '❌ Відмова',
            message: `❌ Rejected promise in {delay}ms`,
            position: 'topRight',
        });
    });
});

