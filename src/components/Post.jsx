export default function Post() {
  return (
    <div className="grid grid-cols-[0.8fr,1fr] gap-4 mb-8">
      <div className="post-image">
        <img
          src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*Mlvc6oPtCxErCg1m"
          alt=""
        />
      </div>
      
      <div className="post-text">
        <h2 className="text-2xl font-bold">
          15 Killer Websites for Web Developers
        </h2>
        <p className="flex gap-2 text-xs my-1">
          <a href="" className="author">
            Venti
          </a>
          <time>2023-01-06 16:45</time>
        </p>
        <p className="my-2 font-thin">
          As a front-end development engineer, you must have used many tools to
          increase your productivity. They can be websites, documentation, or a
          JavaScript library.
        </p>
      </div>
    </div>
  );
}
