import Image from "next/image";

export default function AboutComponent() {
  return (
    <main className="max-w-[1280px] mx-auto desktop:pt-15">
      <div className="mx-5 border-t-4 border-yellow py-10 grid gap-10 desktop:mx-10 desktop:border-none desktop:py-0 desktop:grid-cols-2">
        <h3 className="text-heading col-span-full">About</h3>
        <div className="grid gap-10 tablet:grid-cols-2 desktop:grid-cols-1 desktop:col-span-full">
          <div className="space-y-4">
            <p>
              Lorem ipsum dolor sit amet consectetur. Viverra lacinia blandit
              pulvinar a nunc purus elit. At eleifend in mi at.
            </p>
            <p>
              Diam a id parturient fermentum amet leo. Sit neque sed tellus
              maecenas erat morbi a. Justo laoreet amet nibh in vitae nunc. Eu
              nec dignissim molestie semper in habitasse dolor cras massa.
              Mattis quis nunc vulputate fames neque.
            </p>
          </div>
          <div className="grid gap-10 desktop:grid-cols-3">
            <Image
              src="/images/placeholders/image6.jpg"
              alt="About Clone Kings"
              width={800}
              height={600}
              className="object-cover h-full aspect-[4/2.5] tablet:aspect-[4/2] desktop:aspect-[4/3.5]"
              sizes="(max-width:800px) 100vw, (max-width:1280px) 50vw, 640px"
            />
            <Image
              src="/images/placeholders/image7.jpg"
              alt="About Clone Kings"
              width={380}
              height={300}
              className="hidden desktop:block object-cover desktop:aspect-[4/3.5]"
            />
            <Image
              src="/images/placeholders/image8.jpg"
              alt="About Clone Kings"
              width={380}
              height={300}
              className="hidden desktop:block object-cover desktop:aspect-[4/3.5]"
            />
          </div>
        </div>
        <div className="grid gap-10 tablet:grid-cols-2 desktop:grid-cols-1">
          <div className="space-y-5 tablet:order-last desktop:order-first">
            <h3>Why Clone Kings?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Faucibus justo magna dui
              arcu gravida. Amet etiam vestibulum sit viverra auctor viverra
              molestie. Auctor at amet eu maecenas malesuada elementum. Risus
              urna turpis eget id.
            </p>
          </div>
          <Image
            src="/images/placeholders/image4.jpg"
            alt="About Clone Kings"
            width={800}
            height={600}
            className="object-cover h-full aspect-[4/2.5] tablet:aspect-[4/2.5]"
            sizes="(max-width:800px) 100vw, (max-width:1280px) 50vw, 640px"
          />
        </div>
        <div className="grid gap-10 tablet:grid-cols-2 desktop:grid-cols-1">
          <div className="space-y-5">
            <h3>Why our strains are unique</h3>
            <div className="space-y-4">
              <p>
                Lorem ipsum dolor sit amet consectetur. At egestas morbi urna
                cursus blandit cursus tincidunt. Integer pellentesque mauris
                egestas pellentesque gravida consectetur odio egestas aenean.
                Porttitor amet pulvinar ut nisl quis ultricies risus duis
                tempus. Ullamcorper facilisis enim pellentesque morbi adipiscing
                massa enim tempor.
              </p>
              <p>
                Cursus aliquam etiam vitae porttitor vitae cursus. Augue
                placerat bibendum porttitor pulvinar posuere ut eros. Purus
                lectus sed tincidunt sapien tristique. Nibh vel neque donec
                augue sed.
              </p>
            </div>
          </div>
          <Image
            src="/images/placeholders/image5.jpg"
            alt="About Clone Kings"
            width={800}
            height={600}
            className="hidden tablet:block h-full object-cover aspect-[4/2.5] tablet:aspect-[4/2] desktop:aspect-[4/1.75]"
            sizes="(max-width:800px) 100vw, (max-width:1280px) 50vw, 640px"
          />
        </div>
      </div>
    </main>
  );
}
