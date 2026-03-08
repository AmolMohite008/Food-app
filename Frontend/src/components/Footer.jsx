import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-white py-10">
      <div className="w-[90%] mx-auto items-center flex flex-col md:flex-row gap-10 justify-between">

        {/* LEFT */}
        <div className="flex flex-col items-center gap-4 max-w-sm">
          {/*<img src={assets.logo} className="w-32 text-white" /> */}
          <h1 className="font-bold text-3xl">CraveCart ..</h1>
          <p className="text-sm text-center text-gray-400">
             Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise.
          </p>

          <div className="flex gap-3">
            <img src={assets.facebook_icon} className="w-8 cursor-pointer" />
            <img src={assets.twitter_icon} className="w-8 cursor-pointer" />
            <img src={assets.linkedin_icon} className="w-8 cursor-pointer" />
          </div>
        </div>

        {/* MIDDLE */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">Company</h3>
          <ul className="text-gray-400 text-sm flex flex-col gap-2">
            <li className="cursor-pointer hover:text-white">Home</li>
            <li className="cursor-pointer hover:text-white">About Us</li>
            <li className="cursor-pointer hover:text-white">Privacy Policy</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">Get in Touch</h3>
          <p className="text-gray-400 text-sm">+1-653546-30</p>
          <p className="text-gray-400 text-sm cursor-pointer hover:text-white">
            Contact Us
          </p>
        </div>

      </div>

      {/* BOTTOM LINE */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
         CraveCart@123gamil.Com   All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

