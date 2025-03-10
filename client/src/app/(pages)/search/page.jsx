import { Suspense } from "react";

import AppData from "@data/app.json";

import PageBanner from "@components/PageBanner";
import Sidebar from "@components/Sidebar";
import BlogFiltered from '@components/blog/BlogFiltered';

import { generateJsonPostsData } from "@library/posts";

export const metadata = {
  title: {
		default: "Search",
	},
  description: AppData.settings.siteDescription,
}

import { promises as fs } from 'fs';

async function Search() {
  const generateJsonPosts = await generateJsonPostsData();
  const file = await fs.readFile(process.cwd() + '/src/data/.json/posts.json', 'utf8');
  const posts = JSON.parse(file);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PageBanner pageTitle={"Kết quả: %s"} breadTitle={"tìm kiếm"} />
      </Suspense>
      
      {/* blog list */}
      <section className="sb-blog-list sb-p-90-90">
        <div className="sb-bg-1">
          <div></div>
        </div>
        <div className="container" data-sticky-container>
          <div className="row">
            <div className="col-lg-8">
          
              <div className="sb-mb-60">
                <h2 className="sb-cate-title sb-mb-30">Kết quả <span>tìm kiếm</span></h2>
              </div>
              <Suspense fallback={<div>Đang tải...</div>}>
                <BlogFiltered
                  items={posts}
                  columns={2}
                />
              </Suspense>
            </div>
            <div className="col-lg-4">
              <div className="sb-sidebar-frame sb-pad-type-1 sb-sticky" data-margin-top="120">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* blog list end */}
    </>
  );
};
export default Search;