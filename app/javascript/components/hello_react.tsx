// import React from 'react'
// import ReactDOM from 'react-dom'

// const Hello = props => (
//   React.createElement('div', null, `Hello ${props.name}`)
// )

// Hello.defaultProps = {
//   name: 'David'
// }

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(
//     React.createElement(Hello, {name: 'Rails 7'}, null),
//     document.getElementById('app'),
//   )
// })



import * as React from "react";
import * as ReactDOM from "react-dom";

interface AppProps {
  arg: string;
}

const App = ({ arg }: AppProps) => {
  return <div>{`Hello, ${arg}!`}</div>;
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  ReactDOM.render(<App arg="Rails 7 with ESBuild" />, rootEl);
});
