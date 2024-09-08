interface props {
  size?: number;
  color?: string;
};

const Loader = ({size = 20,color = "#FFF"}: props): JSX.Element => (
 <div
  className={`mx-auto inline-block rounded-full border-[3px] border-[${color}] border-t-transparent animate-spin`}
  style={{height: size, width: size,}}
 ></div>
);

export default Loader;