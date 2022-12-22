const Home = () => {
  const homeDiv = document.createElement('div');
  homeDiv.setAttribute('id', 'home');
  homeDiv.innerHTML = `
  <img src='/img/logo.png'>
  <h1>Content loading...</h1>
  `
  document.getElementById('root').appendChild(homeDiv);
};

export default Home;
