let isError = false;
const submitBtn = document.querySelector("button");
const cities = document.querySelector(".cities");
const input = document.querySelector("input");
const msg = document.querySelector(".msg");

//**CLICK SUBMIT */
submitBtn.addEventListener("click", () => {
  getWeather(input.value);
  input.value = "";
  input.focus();
});

//**CALL API */

const getWeather = async (cityName) => {
  localStorage.setItem(
    "tokenKey",
    "z2NIFgG+NOEWmKGRH+SG4ctCbaANYaxxIzrLYNt7yIdHVBqDEDqL1X6SFIXKkjzj"
  );
  const tokenKey = DecryptStringAES(localStorage.getItem("tokenKey"));
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${tokenKey}&units=metric&lang=tr`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      isError = true;
    }
    const data = await res.json();
    resultWeather(data);
  } catch (error) {
    console.log(error);
    msg.textContent = `City not found! Please enter a city`;
    setTimeout(() => {
      msg.textContent = "";
    }, 5000);
  }
};

//**CREATE NEW CITY CARD */
const resultWeather = (data) => {
  const {
    name,
    main: { temp },
    weather,
    sys: { country },
  } = data;
  console.log(name, temp, weather[0].description, weather[0].icon);

  // const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const node = cities.querySelectorAll("li");
  const nodeArr = Array.from(node);
  console.log(nodeArr);

  if (nodeArr.length >= 2) {
    nodeArr[1].remove();
  }

  const newLi = document.createElement("li");
  newLi.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h6 class="card-subtitle mb-2 text-muted">${name}<sup class="bg-warning text-light rounded-1">${country}</sup>
              </h6>
              <h5 class="card-title">${Math.round(temp)}<sup>&deg</sup>C</h5>
              <img src="./css/icons/${weather[0].icon}.png" alt="">
              <p class="card-text">${weather[0].description}</p>
            </div>
          </div>`;
  cities.prepend(newLi);
};

document.addEventListener("keydown", (e) => {
  e.key == "Enter" && submitBtn.click();
});
