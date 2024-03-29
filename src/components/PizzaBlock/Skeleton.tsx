import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = () => (
   <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
   >
      <circle cx="134" cy="170" r="125" />
      <rect x="0" y="6" rx="10" ry="10" width="280" height="20" />
      <rect x="0" y="315" rx="10" ry="10" width="280" height="87" />
      <rect x="1" y="430" rx="10" ry="10" width="90" height="27" />
      <rect x="124" y="420" rx="25" ry="25" width="152" height="45" />
   </ContentLoader>
)

export default Skeleton;