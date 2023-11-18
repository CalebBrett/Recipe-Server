import Link from "next/link";
import SummaryCard from "./components/summary-card";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Caleb Cooks</title>
        <meta name="description" content="Recipe Server" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="header">
        <Link className="button" href="/create">
          New
        </Link>
        <input type="search" />
        <Link className="button" href="/viewer">
          Cook
        </Link>
      </div>
      <div className="filters">
        <button>Meals</button>
        <button>Breakfast</button>
        <button>Snacks</button>
        <button>Sweets</button>
      </div>
      <div id="list">
        <SummaryCard name="Rice" desc="" />
        <SummaryCard name="Pork" desc="hi" />
        <SummaryCard name="bourrito" desc="" />
        <SummaryCard name="PORK SCHINTZLE" desc="lo" />
        <SummaryCard name="PORK SCHINTZLE" desc="lo" />
        <SummaryCard name="PORK SCHINTZLE" desc="lo" />
        <SummaryCard name="PORK SCHINTZLE" desc="lo" />
        <div className="card">
          <h1>PORK SCHINTZLE</h1>
          <h2 className={`${inter.className}`}>
            Docs <span>-&gt;</span>
          </h2>
        </div>
      </div>
    </>
  );
}
