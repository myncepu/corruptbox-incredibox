import Markdown from "@/components/markdown";
import Link from "next/link";
import { MdOutlineHome } from "react-icons/md";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Who Made the Sounds for Incredibox?",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/who-made-the-sounds-for-Incredibox`,
    },
  };
}

export default function WhoMadeTheSounds() {
  const content = `# Who Made the Sounds for Incredibox?

## The Creative Team

The sounds for Incredibox were created by **Paul Malburet**, better known as **Incredible Polo**. He is one of the three French friends from Saint-Étienne who created Incredibox in 2009.

## The Development Story

In 2006, three talented individuals came together to create what would become Incredibox:

- **Paul Malburet (Incredible Polo)** - Musician and voice artist
- **Allan Durand** - Director and programmer
- **Romain Delambily** - Graphic designer

They wanted to combine their skills to create an interactive musical experience. The cartoon character in Incredibox is actually a caricature of Incredible Polo himself, who provides all the voices and sounds for the game.

## Musical Evolution

Over the years, Incredible Polo has created unique soundscapes for multiple versions of Incredibox:

### Original Versions (Free Demo)
- **V1: Alpha** (2009) - Old school beatbox with Jazz and Funk influences
- **V2: Little Miss** (2012) - Hip-Hop inspired sounds
- **V3: Sunrise** (2013) - Electropop style
- **V4: The Love** (2014) - French house music

### Premium Versions
- **V5: Brazil** (2016) - Brazilian music influences
- **V6: Alive** (2018) - Japanese culture with modern hip-hop and trap
- **V7: Jeevan** (2019) - Traditional Indian music and Bollywood
- **V8: Dystopia** (2020) - Cyberpunk-inspired sounds
- **V9: Wekiddy** (2023) - 90s hip-hop and pre-web culture

## Albums and Releases

Incredible Polo has also released several albums featuring Incredibox music:

- **Incredibox: 10th Anniversary** (2019) - A remastered collection of all 7 versions
- **Incredibox: The Unreleased** (2021) - 9 tracks from various demo phases
- Multiple single releases for newer versions

## Recognition

The unique sound design by Incredible Polo has contributed to numerous awards for Incredibox, including:
- Digital Ehon Award Grand Prize (2010)
- AASL Best Apps for Teaching & Learning (2018)
- Multiple FWA awards

## Legacy

Paul Malburet's sound design has helped make Incredibox a global success, with over 2 million sales across all platforms. His creative approach to beatboxing and sound design has made the game both educational and entertaining, allowing users to create music regardless of their musical background.

Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;

  return (
    <div>
      <Link className="text-base-content cursor-pointer" href="/">
        <MdOutlineHome className="text-2xl mx-8 my-8" />
      </Link>
      <div className="max-w-3xl mx-auto leading-loose pt-4 pb-8 px-8">
        <Markdown content={content} />
      </div>
    </div>
  );
}
