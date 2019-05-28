
window.onload = function () {
  document.getElementById("loader").style.display = "none";
};
{
  async function loadingVideos() {
    let loading = true;

    // тут делаешь видимым загрузчик

    const response = await fetch(`http://www.omdbapi.com/?type=movie&apikey=7ea4aa35&s=${searchTerm}`);

    loading = false;
    // тут делаешь невидимым загрузчик
    // Можно обойтись и без флагов
  }

  loadingVideos();
}