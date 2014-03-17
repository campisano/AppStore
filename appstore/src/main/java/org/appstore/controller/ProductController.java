package org.appstore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.appstore.controller.GetProductResponse;

@Controller
@RequestMapping("/product")
public class ProductController {
/*
    @RequestMapping(value="/list", method = RequestMethod.GET)
    public String welcome(ModelMap model) {

        model.addAttribute("message", "Maven Web Project + Spring 3 MVC - welcome()");

        //Spring uses InternalResourceViewResolver and return back index.jsp
        return "index";

    }
*/
    @RequestMapping(value="{id}", method = RequestMethod.GET)
    public @ResponseBody GetProductResponse getProduct(@PathVariable long id) {

        GetProductResponse product = new GetProductResponse();
        product.setId(id);

        return product;
    }
}
