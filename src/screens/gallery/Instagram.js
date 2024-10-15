import { useEffect } from 'react';

const Instagram = ({ url }) => {
  useEffect(() => {
    // Re-render the Instagram embed script after component mounts
    window?.instgrm?.Embeds?.process();
  }, []);

  return (
    <>
   
    <blockquote
  className="instagram-media"
  data-instgrm-permalink={url}
  data-instgrm-version={14}
  style={{
    background: "#FFF",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
    margin: 1,
    // maxWidth: "540px",
    // minWidth: "220px",
    padding: 0,
    // width: "calc(100% - 2px)"
  }}
>
  <div style={{ padding: 16 }}>
    <a
      href={url}
      style={{
        background: "#FFFFFF",
        lineHeight: 0,
        padding: "0 0",
        textAlign: "center",
        textDecoration: "none",
        width: "100%"
      }}
      target="_blank"
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div
          style={{
            backgroundColor: "#F4F4F4",
            borderRadius: "50%",
            flexGrow: 0,
            height: 40,
            marginRight: 14,
            width: 40
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center"
          }}
        >
          <div
            style={{
              backgroundColor: "#F4F4F4",
              borderRadius: 4,
              flexGrow: 0,
              height: 14,
              marginBottom: 6,
              width: 100
            }}
          />
          <div
            style={{
              backgroundColor: "#F4F4F4",
              borderRadius: 4,
              flexGrow: 0,
              height: 14,
              width: 60
            }}
          />
        </div>
      </div>
      <div style={{ padding: "19% 0" }} />
      <div
        style={{
          display: "block",
          height: 50,
          margin: "0 auto 12px",
          width: 50
        }}
      >
        {/* Instagram logo SVG */}
      </div>
      <div style={{ paddingTop: 8 }}>
        <div
          style={{
            color: "#3897f0",
            fontFamily: "Arial,sans-serif",
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: 550,
            lineHeight: 18
          }}
        >
          View this post on Instagram
        </div>
      </div>
    </a>
  </div>
</blockquote>

</>
    
  );
};

export default Instagram;
