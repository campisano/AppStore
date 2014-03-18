package org.appstore.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.appstore.view.GetProductResponse;

@Controller
@RequestMapping("/product")
public class ProductView {

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	GetProductListResponse getProductList() {

		GetProductListResponse list = new GetProductListResponse();
		GetProductResponse product;

		for (int i = 0; i < 10; ++i) {
			product = new GetProductResponse();
			product.setId(i);
			list.add(product);
		}

		return list;
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public @ResponseBody
	GetProductResponse getProduct(@PathVariable long id) {

		GetProductResponse product = new GetProductResponse();
		product.setId(id);

		return product;
	}
}
