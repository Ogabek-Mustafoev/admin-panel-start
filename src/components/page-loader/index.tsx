import type {FC} from "react";
import loadingSvg from '@/assets/loading.svg'


export const PageLoader: FC<{ className?: string }> = ({className = "h-screen w-screen"}) => {

  return (
    <div className={`${className} overflow-hidden flex items-center justify-center`}>
      <img src={loadingSvg} alt="loading" className="h-20 w-20" />
    </div>
  )
}