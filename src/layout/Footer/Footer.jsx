const gitHubUrl = "https://github.com/Kevindietme/coffee-list--menu";
const getFullYear = new Date().getFullYear();

export default function Footer () {

  return (
    <footer className="bg-yellow-500 w-full  ">
      <p className="w-full mx-auto text-center">&copy; {getFullYear}
        <br />
        <a href={gitHubUrl} target="_blank" rel="noreferrer">See Code in Github</a>
      </p>
    </footer>
  )
};