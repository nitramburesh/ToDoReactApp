const Link = (props) => {
  return (
    <a className={props.className} href={props.route}>
      {props.children}
    </a>
  );
};

export default Link;
