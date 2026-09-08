import {motion} from "framer-motion"




export function Title ({title} : {title : string}){

    return (
        <motion.div
            initial={{x : 20, opacity : 0}}
            animate={{x: 0, opacity : 1}}
            transition={{duration: 0.8, ease : "easeInOut", delay: 0.8}}
            className="w-70 h-60 max-w-md flex flex-col items-start justify-center"
        >
            <h1 className="text-surface-text text-3xl font-bold px-5 py-3 mb-4">SIH authentification</h1>
            <p className="text-surface-text font-semibold px-5 py-3">{title}</p>
        </motion.div>
    )
}