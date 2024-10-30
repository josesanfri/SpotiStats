import { Disc3, Undo2 } from 'lucide-react';

const data = [
  {
    icon: Disc3,
    title: "Your own charts",
    paragraph: "View your most listened tracks, artists and genres and switch between 3 different time periods. Your data is updated approximately every day."
  },
  {
    icon: Undo2,
    title: "Recently played tracks",
    paragraph: "Check out your recently played tracks."
  }
];

const HomeInfo = () => {
  return (
    <section className="p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
      {data.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <article key={index} className="mx-auto flex flex-row items-center gap-4 py-2">
            <div className="flex items-center justify-center">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">{item.title}</h3>
              <p>{item.paragraph}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default HomeInfo;