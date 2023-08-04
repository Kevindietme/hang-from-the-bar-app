const gitHubUrl = "https://github.com/Kevindietme/coffee-list--menu";
const getFullYear = new Date().getFullYear();

export default function Footer () {

  return (
    <footer className="mt-20">
      <p className="w-full mx-auto text-center text-gray-600">&copy; {getFullYear}
        <br />
        <a href={gitHubUrl} target="_blank" rel="noreferrer">See Code in Github</a>
      </p>
    </footer>
  )
};