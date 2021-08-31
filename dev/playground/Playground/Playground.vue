<template>
    <div class="playground pab-9">
        <div class="aside">
            <nav>
                <ul class="listbare" @click="onNavClick">
                    <li>
                        <router-link :to="{ name: 'dashboard' }" class="btn btn-tertiary">
                            <f-svg-icon size="12px" class="rtl-mirror" style="margin-inline-end: 3px">
                                <iconset icon="arrow-left" />
                            </f-svg-icon>
                            Back
                        </router-link>
                    </li>
                    <li>
                        <a href="#" data-section="headings" :class="{ active: section === 'headings' }">Headings</a>
                    </li>
                    <li>
                        <a href="#" data-section="fontsizes" :class="{ active: section === 'fontsizes' }">Font sizes</a>
                    </li>
                    <li>
                        <a href="#" data-section="textsizes" :class="{ active: section === 'textsizes' }">Text sizes</a>
                    </li>
                    <li>
                        <a href="#" data-section="paragraphs" :class="{ active: section === 'paragraphs' }">
                            Paragraphs
                        </a>
                    </li>
                    <li><a href="#" data-section="colors" :class="{ active: section === 'colors' }">Colors</a></li>
                    <li>
                        <a href="#" data-section="boxshadow" :class="{ active: section === 'boxshadow' }">Boxshadow</a>
                    </li>
                    <li><a href="#" data-section="spacers" :class="{ active: section === 'spacers' }">Spacers</a></li>
                    <li>
                        <a href="#" data-section="bradius" :class="{ active: section === 'bradius' }">Border radius</a>
                    </li>
                    <li><a href="#" data-section="grid" :class="{ active: section === 'grid' }">Grid</a></li>
                    <li>
                        <a href="#" data-section="gridauto" :class="{ active: section === 'gridauto' }">
                            Grid auto fill
                        </a>
                    </li>
                    <li><a href="#" data-section="fbutton" :class="{ active: section === 'fbutton' }">FButton</a></li>
                    <li><a href="#" data-section="finput" :class="{ active: section === 'finput' }">FInput</a></li>
                    <li><a href="#" data-section="fselect" :class="{ active: section === 'fselect' }">FSelect</a></li>
                    <li><a href="#" data-section="foption" :class="{ active: section === 'foption' }">FOption</a></li>
                    <li>
                        <a href="#" data-section="ftogglebutton" :class="{ active: section === 'ftogglebutton' }"
                            >FToggleButton</a
                        >
                    </li>
                    <li><a href="#" data-section="fform" :class="{ active: section === 'fform' }">FForm</a></li>
                    <li>
                        <text-direction-switch />
                    </li>
                </ul>
            </nav>
        </div>
        <main>
            <section v-if="section === 'headings'" class="typographytest">
                <!--    <div class="test-square"></div>-->

                <h1>
                    H1 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis illo impedit nemo qui
                    recusandae sunt, veritatis.
                </h1>
                <h1>تفاده قرار</h1>
                <br /><br />
                <!--    <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>-->
                <h2>
                    H2 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis illo impedit nemo qui
                    recusandae sunt, veritatis.
                </h2>
                <h2>تفاده قرار</h2>
                <br /><br />
                <!--    <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>-->
                <h3>
                    H3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis illo impedit nemo qui
                    recusandae sunt, veritatis.
                </h3>
                <h3>تفاده قرار</h3>
                <br /><br />
                <!--    <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis illo impedit nemo qui recusandae sunt, veritatis.</h3>-->
                <h4>
                    H4 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis illo impedit nemo qui
                    recusandae sunt, veritatis.
                </h4>
                <h4>تفاده قرار</h4>
            </section>

            <section v-if="section === 'fontsizes'" class="typographytest">
                <code>--f-font-size-1 (.fos-1)</code>
                <p class="fos-1">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                    <br />
                    <span>صنعت چاپ و با استفاده از طراحان گرافیک است</span>
                </p>
                <code>--f-font-size-2 (.fos-2)</code>
                <p class="fos-2">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                    <br />
                    <span>صنعت چاپ و با استفاده از طراحان گرافیک است</span>
                </p>
                <code>--f-font-size-3 (.fos-3)</code>
                <p class="fos-3">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                    <br />
                    <span>صنعت چاپ و با استفاده از طراحان گرافیک است</span>
                </p>
                <code>--f-font-size-4 (.fos-4)</code>
                <p class="fos-4">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                    <br />
                    <span>صنعت چاپ و با استفاده از طراحان گرافیک است</span>
                </p>
                <code>--f-font-size-5 (.fos-5 - base size)</code>
                <p class="fos-5">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                    <br />
                    <span>صنعت چاپ و با استفاده از طراحان گرافیک است</span>
                </p>
                <code>--f-font-size-6 (.fos-6)</code>
                <p class="fos-6">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                    <br /><br />
                    <span>صنعت چاپ و با استفاده از طراحان گرافیک است</span>
                </p>
                <code>--f-font-size-7 (.fos-7)</code>
                <p class="fos-7">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                    <br /><br />
                    <span>صنعت چاپ و با استفاده از طراحان گرافیک است</span>
                </p>
                <code>--f-font-size-8 (.fos-8)</code>
                <p class="fos-8">
                    <span>Lorem ipsum dolor sit amet</span>
                    <br /><br />
                    <span>صنعت چاپ و با استفاده از طراحان گرافیک است</span>
                </p>
                <code>--f-font-size-9 (.fos-9)</code>
                <p class="fos-9">
                    <br />
                    <span>Lorem ipsum dolor sit amet</span>
                    <br /><br /><br />
                    <span>صنعت چاپ و با استفاده از طراحان گرافیک است</span>
                </p>
            </section>

            <section v-if="section === 'textsizes'" class="typographytest">
                <p>(Sets also line-height for the given font)</p>

                <code>.tes-1</code>
                <p class="tes-1">
                    <span
                        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur cumque deleniti
                        dolores eveniet explicabo, magnam mollitia natus nobis officiis quae repudiandae soluta ullam.
                        At doloremque fugit hic natus veniam!</span
                    >
                </p>
                <p class="tes-1">
                    <span>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
                        درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                        وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                    </span>
                </p>
                <code>.tes-2</code>
                <p class="tes-2">
                    <span
                        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur cumque deleniti
                        dolores eveniet explicabo, magnam mollitia natus nobis officiis quae repudiandae soluta ullam.
                        At doloremque fugit hic natus veniam!</span
                    >
                </p>
                <p class="tes-2">
                    <span>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
                        درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                        وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                    </span>
                </p>
                <code>.tes-3</code>
                <p class="tes-3">
                    <span
                        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur cumque deleniti
                        dolores eveniet explicabo, magnam mollitia natus nobis officiis quae repudiandae soluta ullam.
                        At doloremque fugit hic natus veniam!</span
                    >
                </p>
                <p class="tes-3">
                    <span>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
                        درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                        وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                    </span>
                </p>
                <code>.tes-4</code>
                <p class="tes-4">
                    <span
                        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur cumque deleniti
                        dolores eveniet explicabo, magnam mollitia natus nobis officiis quae repudiandae soluta ullam.
                        At doloremque fugit hic natus veniam!</span
                    >
                </p>
                <p class="tes-4">
                    <span>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
                        درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                        وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                    </span>
                </p>
                <code>.tes-5</code> (defualt)
                <p class="tes-5">
                    <span
                        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur cumque deleniti
                        dolores eveniet explicabo, magnam mollitia natus nobis officiis quae repudiandae soluta ullam.
                        At doloremque fugit hic natus veniam!</span
                    >
                </p>
                <p class="tes-5">
                    <span>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
                        درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                        وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                    </span>
                </p>
                <code>.tes-6</code>
                <p class="tes-6">
                    <span
                        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur cumque deleniti
                        dolores eveniet explicabo, magnam mollitia natus nobis officiis quae repudiandae soluta ullam.
                        At doloremque fugit hic natus veniam!</span
                    >
                </p>
                <p class="tes-6">
                    <span>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
                        درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                        وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                    </span>
                </p>
                <code>.tes-7</code>
                <p class="tes-7">
                    <span
                        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur cumque deleniti
                        dolores eveniet explicabo, magnam mollitia natus nobis officiis quae repudiandae soluta ullam.
                        At doloremque fugit hic natus veniam!</span
                    >
                </p>
                <p class="tes-7">
                    <span>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
                        درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                        وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                    </span>
                </p>
                <code>.tes-8</code>
                <p class="tes-8">
                    <span
                        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur cumque deleniti
                        dolores eveniet explicabo, magnam mollitia natus nobis officiis quae repudiandae soluta ullam.
                        At doloremque fugit hic natus veniam!</span
                    >
                </p>
                <p class="tes-8">
                    <span>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
                        درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                        وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                    </span>
                </p>
                <code>.tes-9</code>
                <p class="tes-9">
                    <span
                        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur cumque deleniti
                        dolores eveniet explicabo, magnam mollitia natus nobis officiis quae repudiandae soluta ullam.
                        At doloremque fugit hic natus veniam!</span
                    >
                </p>
                <p class="tes-9">
                    <span>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
                        درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                        وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                    </span>
                </p>
            </section>

            <section v-if="section === 'paragraphs'" class="typographytest">
                <p>
                    <span>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
                        درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                        وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                        اساسا مورد استفاده قرار گیرد.
                    </span>
                </p>
                <p>
                    Ab alias aspernatur beatae deleniti dolor, eligendi enim exercitationem expedita fugit id in itaque
                    iusto magni maiores natus nemo non obcaecati officiis placeat quae temporibus vel velit voluptatem?
                    Accusamus, cum!
                    <span
                        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. At commodi culpa eum excepturi id
                        iusto laboriosam maiores molestias natus quia quibusdam recusandae repellat repellendus sed
                        suscipit ullam unde, vero voluptate!</span
                    ><span
                        >Animi asperiores assumenda autem et exercitationem, expedita facere fugit harum incidunt
                        inventore magni, maiores molestiae nobis nostrum odio, praesentium reprehenderit sequi totam
                        voluptate voluptatibus. Accusantium at necessitatibus nisi quaerat qui!</span
                    ><span
                        >A ab accusamus, ad aut consequuntur, dolores exercitationem in laudantium libero magni optio
                        placeat quae quam quidem, quo reprehenderit voluptatem? Accusamus amet corporis dignissimos
                        illum ipsa, nisi rem tempore velit.</span
                    >
                </p>
                <p>
                    Ad adipisci alias aliquam at earum eos error eveniet ex excepturi id illo incidunt inventore ipsa
                    iusto maiores nulla obcaecati placeat porro provident quas ratione reiciendis repellendus sit
                    veritatis, voluptates.
                </p>
                <!--
                    <p>
                        <button class="btn btn-lg">Button</button>
                        <button class="btn">Button</button>
                        <button class="btn btn-sm">Button</button>
                    </p>
                -->
                <p>
                    Aspernatur assumenda atque cum, esse exercitationem id iure nesciunt nisi, officiis repellendus,
                    sint suscipit ut voluptatum. Ab aut corporis error illo iusto obcaecati optio quasi quod repudiandae
                    ut! Inventore, nam!
                </p>
                <p>
                    Ad adipisci alias aliquam at earum eos error eveniet ex excepturi id illo incidunt inventore ipsa
                    iusto maiores nulla obcaecati placeat porro provident quas ratione reiciendis repellendus sit
                    veritatis, voluptates.
                </p>
            </section>

            <section v-if="section === 'colors'" class="colorstest">
                <h2>Background colors</h2>

                <h3>Primary</h3>
                <div class="gridauto gridauto-miw-128">
                    <div v-for="i in 9" :key="`bl${i}`" class="colorbox">
                        <div class="colorbox_color" :class="`bac-primary-${i}`"></div>
                        <code class="colorbox_label">bac-primary-{{ i }}</code>
                    </div>
                </div>
                <h3>Grey</h3>
                <div class="gridauto gridauto-miw-128">
                    <div v-for="i in 9" :key="`bl${i}`" class="colorbox">
                        <div class="colorbox_color" :class="`bac-grey-${i}`"></div>
                        <code class="colorbox_label">bac-grey-{{ i }}</code>
                    </div>
                </div>
                <h3>Red</h3>
                <div class="gridauto gridauto-miw-128">
                    <div v-for="i in 9" :key="`bl${i}`" class="colorbox">
                        <div class="colorbox_color" :class="`bac-red-${i}`"></div>
                        <code class="colorbox_label">bac-red-{{ i }}</code>
                    </div>
                </div>
                <h3>Green</h3>
                <div class="gridauto gridauto-miw-128">
                    <div v-for="i in 9" :key="`bl${i}`" class="colorbox">
                        <div class="colorbox_color" :class="`bac-green-${i}`"></div>
                        <code class="colorbox_label">bac-green-{{ i }}</code>
                    </div>
                </div>
                <h3>Blue</h3>
                <div class="gridauto gridauto-miw-128">
                    <div v-for="i in 9" :key="`bl${i}`" class="colorbox">
                        <div class="colorbox_color" :class="`bac-blue-${i}`"></div>
                        <code class="colorbox_label">bac-blue-{{ i }}</code>
                    </div>
                </div>
                <h3>Orange</h3>
                <div class="gridauto gridauto-miw-128">
                    <div v-for="i in 9" :key="`bl${i}`" class="colorbox">
                        <div class="colorbox_color" :class="`bac-orange-${i}`"></div>
                        <code class="colorbox_label">bac-orange-{{ i }}</code>
                    </div>
                </div>
                <h3>Yellow</h3>
                <div class="gridauto gridauto-miw-128">
                    <div v-for="i in 9" :key="`bl${i}`" class="colorbox">
                        <div class="colorbox_color" :class="`bac-yellow-${i}`"></div>
                        <code class="colorbox_label">bac-yellow-{{ i }}</code>
                    </div>
                </div>
            </section>

            <section v-if="section === 'boxshadow'" class="boxshadowtest">
                <div class="gridauto gridauto-miw-192 gap-8">
                    <div class="box bos-0">
                        <code><b>.bos-0</b> (--f-box-shadow-0)</code>
                    </div>
                    <div class="box bos-1">
                        <code><b>.bos-1</b> (--f-box-shadow-1)</code>
                    </div>
                    <div class="box bos-2">
                        <code><b>.bos-2</b> (--f-box-shadow-2)</code>
                    </div>
                    <div class="box bos-3">
                        <code><b>.bos-3</b> (--f-box-shadow-3)</code>
                    </div>
                    <div class="box bos-4">
                        <code><b>.bos-4</b> (--f-box-shadow-4)</code>
                    </div>
                    <div class="box bos-5">
                        <code><b>.bos-5</b> (--f-box-shadow-5)</code>
                    </div>
                    <div class="box bos-6">
                        <code><b>.bos-6</b> (--f-box-shadow-6)</code>
                    </div>
                    <div class="box bos-7">
                        <code><b>.bos-7</b> (--f-box-shadow-7)</code>
                    </div>
                    <div class="box bos-8">
                        <code><b>.bos-8</b> (--f-box-shadow-8)</code>
                    </div>
                    <div class="box bos-9">
                        <code><b>.bos-9</b> (--f-box-shadow-9)</code>
                    </div>
                </div>
            </section>

            <section v-if="section === 'spacers'" class="spacerstest">
                <div class="grid">
                    <div class="col-6">
                        <h2>Vertical spacers</h2>

                        <div class="spacer-row">
                            <span class="v-spacer v-spacer-1"></span> <code>--f-spacer-1</code>
                        </div>
                        <div class="spacer-row">
                            <span class="v-spacer v-spacer-2"></span> <code>--f-spacer-2</code>
                        </div>
                        <div class="spacer-row">
                            <span class="v-spacer v-spacer-3"></span> <code>--f-spacer-3</code>
                        </div>
                        <div class="spacer-row">
                            <span class="v-spacer v-spacer-4"></span> <code>--f-spacer-4</code>
                        </div>
                        <div class="spacer-row">
                            <span class="v-spacer v-spacer-5"></span> <code>--f-spacer-5</code>
                        </div>
                        <div class="spacer-row">
                            <span class="v-spacer v-spacer-6"></span> <code>--f-spacer-6</code>
                        </div>
                        <div class="spacer-row">
                            <span class="v-spacer v-spacer-7"></span> <code>--f-spacer-7</code>
                        </div>
                        <div class="spacer-row">
                            <span class="v-spacer v-spacer-8"></span> <code>--f-spacer-8</code>
                        </div>
                        <div class="spacer-row">
                            <span class="v-spacer v-spacer-9"></span> <code>--f-spacer-9</code>
                        </div>
                    </div>

                    <div class="col-6">
                        <h2>Horizontal spacers</h2>

                        <div class="spacer-row">
                            <span class="h-spacer h-spacer-1"></span> <code>--f-spacer-1</code>
                        </div>
                        <div class="spacer-row">
                            <span class="h-spacer h-spacer-2"></span> <code>--f-spacer-2</code>
                        </div>
                        <div class="spacer-row">
                            <span class="h-spacer h-spacer-3"></span> <code>--f-spacer-3</code>
                        </div>
                        <div class="spacer-row">
                            <span class="h-spacer h-spacer-4"></span> <code>--f-spacer-4</code>
                        </div>
                        <div class="spacer-row">
                            <span class="h-spacer h-spacer-5"></span> <code>--f-spacer-5</code>
                        </div>
                        <div class="spacer-row">
                            <span class="h-spacer h-spacer-6"></span> <code>--f-spacer-6</code>
                        </div>
                        <div class="spacer-row">
                            <span class="h-spacer h-spacer-7"></span> <code>--f-spacer-7</code>
                        </div>
                        <div class="spacer-row">
                            <span class="h-spacer h-spacer-8"></span> <code>--f-spacer-8</code>
                        </div>
                        <div class="spacer-row">
                            <span class="h-spacer h-spacer-9"></span> <code>--f-spacer-9</code>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="section === 'bradius'">
                <div>
                    <div class="br-row">
                        <span class="br bor-1"></span> <code><b>.bor-1</b> (--f-border-radius-1)</code>
                    </div>
                    <div class="br-row">
                        <span class="br bor-2"></span> <code><b>.bor-2</b> (--f-border-radius-2)</code>
                    </div>
                    <div class="br-row">
                        <span class="br bor-3"></span> <code><b>.bor-3</b> (--f-border-radius-3)</code>
                    </div>
                    <div class="br-row">
                        <span class="br bor-4"></span> <code><b>.bor-4</b> (--f-border-radius-4)</code>
                    </div>
                    <div class="br-row">
                        <span class="br bor-5"></span> <code><b>.bor-5</b> (--f-border-radius-5)</code>
                    </div>
                    <div class="br-row">
                        <span class="br bor-6"></span> <code><b>.bor-6</b> (--f-border-radius-6)</code>
                    </div>
                    <div class="br-row">
                        <span class="br bor-7"></span> <code><b>.bor-7</b> (--f-border-radius-7)</code>
                    </div>
                    <div class="br-row">
                        <span class="br bor-8"></span> <code><b>.bor-8</b> (--f-border-radius-8)</code>
                    </div>
                    <div class="br-row">
                        <span class="br bor-9"></span> <code><b>.bor-9</b> (--f-border-radius-9)</code>
                    </div>
                    <div class="br-row">
                        <span class="br bor-round"></span> <code><b>.bor-round</b> (--f-border-radius-round)</code>
                    </div>
                    <div class="br-row">
                        <span class="br bor-rounded" style="width: 200px; height: 64px"></span>
                        <code><b>.bor-rounded</b> (--f-border-radius-rounded)</code>
                    </div>
                </div>
            </section>

            <section v-if="section === 'grid'" class="gridtest">
                <h3><code>.grid .grid-colspadding .gapr-6</code></h3>
                <div class="grid grid-colspadding gapr-6">
                    <div>item 1</div>
                    <div>item 2</div>

                    <div class="col-6"><code>.col-6</code></div>
                    <div class="col-6"><code>.col-6</code></div>

                    <div class="sm:col-4"><code>.sm:col-4</code></div>
                    <div class="sm:col-8"><code>.sm:col-8</code></div>

                    <div class="md:col-5"><code>.md:col-5</code></div>
                    <div class="md:col-5"><code>.md:col-5</code></div>
                </div>

                <h3><code>.grid .grid-cols-3 .grid-colspadding .gap-6</code></h3>
                <div class="grid grid-cols-3 grid-colspadding gap-6">
                    <div class="col-1"><code>.col-1</code></div>
                    <div class="col-1"><code>.col-1</code></div>
                    <div class="col-1"><code>.col-1</code></div>
                </div>

                <h3>Complex example</h3>
                <div class="grid grid-colspadding">
                    <div class="md:col-4">item 1</div>
                    <div class="col-4 sm:col-12 md:col-8">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate et, in magni maiores
                        neque quae quia quos ullam vero! Consequatur cum cupiditate facere fugit iste magnam non
                        pariatur vel.
                    </div>

                    <div class="col-2 u-hidden u-visible no-bg"></div>
                    <div class="md:col-5">item 3</div>
                    <div class="md:col-5">item 4</div>

                    <div class="grid md:col-6">
                        <div class="col-6">item 5 a</div>
                        <div class="col-6">item 5 b</div>
                        <div class="col-6">item 5 c</div>
                        <div class="col-6">item 5 d</div>
                    </div>
                    <div class="md:col-6">item 6</div>
                </div>

                <h3>Example 2</h3>
                <span class="grid grid-cols-16 grid-colspadding">
                    <span class="test-item sm:col-16 md:col-10"
                        ><span class="label">
                            Address
                            <!----></span
                        ><a
                            href="#/account/0x76AE07E6D236c1aE3F5C3112F387ad82gc-69A2471/"
                            class="break-word value"
                            aria-label="Address"
                        >
                            0x76AE07E6D236c1aE3F5C3112F3`87ad82gc-69A2471
                        </a></span
                    >
                    <span class="test-item sm:col-8 md:col-3 md:tea-right"
                        ><span class="label">Available</span><span class="value">13.00 FTM</span></span
                    >
                    <span class="test-item sm:col-8 md:col-3 md:tea-right"
                        ><span class="label">Total Balance</span><span class="value">13.00 FTM</span></span
                    >
                </span>
            </section>

            <section v-if="section === 'gridauto'" class="gridautotest">
                <h3><code>.gridauto</code></h3>
                <div class="gridauto">
                    <div>item 1</div>
                    <div>item 2</div>
                    <div>item 3</div>
                    <div>item 4</div>
                    <div>item 5</div>
                    <div>item 6</div>
                </div>

                <br /><br />

                <h3><code>.gridauto .gridauto-colspadding</code></h3>
                <div class="gridauto gridauto-colspadding">
                    <div>item 1</div>
                    <div>item 2</div>
                    <div>item 3</div>
                    <div>item 4</div>
                    <div>item 5</div>
                    <div>item 6</div>
                </div>

                <h3><code>.gridauto .gridauto-miw-128 .gridauto-colspadding</code></h3>
                <div class="gridauto gridauto-miw-128 gridauto-colspadding">
                    <div>item 1</div>
                    <div>item 2</div>
                    <div>item 3</div>
                    <div>item 4</div>
                    <div>item 5</div>
                    <div>item 6</div>
                </div>
            </section>

            <section v-if="section === 'fbutton'" class="fbuttontest">
                <h3>Primary (default)</h3>
                <f-button size="large" label="Large" />
                <f-button label="Default" />
                <f-button size="small" label="Small" />
                <f-button size="mini" label="Mini" />
                <br />
                <f-button disabled size="large" label="Large" />
                <f-button disabled label="Default" />
                <f-button disabled size="small" label="Small" />
                <f-button disabled size="mini" label="Mini" />
                <h3>Secondary</h3>
                <f-button secondary size="large" label="Large" />
                <f-button secondary label="Default" />
                <f-button secondary size="small" label="Small" />
                <f-button secondary size="mini" label="Mini" />
                <br />
                <f-button disabled secondary size="large" label="Large" />
                <f-button disabled secondary label="Default" />
                <f-button disabled secondary size="small" label="Small" />
                <f-button disabled secondary size="mini" label="Mini" />
                <h3>Tertiary</h3>
                <f-button tertiary size="large" label="Large" />
                <f-button tertiary label="Default" />
                <f-button tertiary size="small" label="Small" />
                <f-button tertiary size="mini" label="Mini" />
                <br />
                <f-button disabled tertiary size="large" label="Large" />
                <f-button disabled tertiary label="Default" />
                <f-button disabled tertiary size="small" label="Small" />
                <f-button disabled tertiary size="mini" label="Mini" />
                <h3>Round</h3>
                <f-button round>
                    <f-svg-icon><icon-times /></f-svg-icon>
                </f-button>
                <f-button round secondary>
                    <f-svg-icon><icon-times /></f-svg-icon>
                </f-button>
                <f-button round tertiary>
                    <f-svg-icon><icon-times /></f-svg-icon>
                </f-button>
                <h3>Color variants</h3>
                <f-button label="Default" class="btn-red" />
                <f-button secondary label="Default" class="btn-red" />
                <f-button tertiary label="Default" class="btn-red" />
                <br />
                <f-button disabled label="Default" class="btn-red" />
                <f-button disabled secondary label="Default" class="btn-red" />
                <f-button disabled tertiary label="Default" class="btn-red" />
                <br /><br />
                <f-button label="Default" class="btn-green" />
                <f-button secondary label="Default" class="btn-green" />
                <f-button tertiary label="Default" class="btn-green" />
                <br />
                <f-button disabled label="Default" class="btn-green" />
                <f-button disabled secondary label="Default" class="btn-green" />
                <f-button disabled tertiary label="Default" class="btn-green" />
                <br /><br />
                <f-button label="Default" class="btn-orange" />
                <f-button secondary label="Default" class="btn-orange" />
                <f-button tertiary label="Default" class="btn-orange" />
                <br />
                <f-button disabled label="Default" class="btn-orange" />
                <f-button disabled secondary label="Default" class="btn-orange" />
                <f-button disabled tertiary label="Default" class="btn-orange" />
                <br /><br />
                <f-button label="Default" class="btn-grey" />
                <f-button secondary label="Default" class="btn-grey" />
                <f-button tertiary label="Default" class="btn-grey" />
                <br />
                <f-button disabled label="Default" class="btn-grey" />
                <f-button disabled secondary label="Default" class="btn-grey" />
                <f-button disabled tertiary label="Default" class="btn-grey" />
                <br /><br />
                <div class="bac-grey-8 pa-5 darktheme">
                    <f-button label="Default" />
                    <f-button secondary label="Default" class="btn-light" />
                    <f-button tertiary label="Default" class="btn-light" />
                    <br />
                    <f-button disabled label="Default" />
                    <f-button disabled secondary label="Default" class="btn-light" />
                    <f-button disabled tertiary label="Default" class="btn-light" />
                </div>
                <br /><br />
                <f-card>
                    <h3>Primary (default)</h3>
                    <f-button size="large" label="Large" />
                    <f-button label="Default" />
                    <f-button size="small" label="Small" />
                    <f-button size="mini" label="Mini" />
                    <br />
                    <f-button disabled size="large" label="Large" />
                    <f-button disabled label="Default" />
                    <f-button disabled size="small" label="Small" />
                    <f-button disabled size="mini" label="Mini" />
                    <h3>Secondary</h3>
                    <f-button secondary size="large" label="Large" />
                    <f-button secondary label="Default" />
                    <f-button secondary size="small" label="Small" />
                    <f-button secondary size="mini" label="Mini" />
                    <br />
                    <f-button disabled secondary size="large" label="Large" />
                    <f-button disabled secondary label="Default" />
                    <f-button disabled secondary size="small" label="Small" />
                    <f-button disabled secondary size="mini" label="Mini" />
                    <h3>Tertiary</h3>
                    <f-button tertiary size="large" label="Large" />
                    <f-button tertiary label="Default" />
                    <f-button tertiary size="small" label="Small" />
                    <f-button tertiary size="mini" label="Mini" />
                    <br />
                    <f-button disabled tertiary size="large" label="Large" />
                    <f-button disabled tertiary label="Default" />
                    <f-button disabled tertiary size="small" label="Small" />
                    <f-button disabled tertiary size="mini" label="Mini" />
                    <h3>Round</h3>
                    <f-button round>
                        <f-svg-icon><icon-times /></f-svg-icon>
                    </f-button>
                    <f-button round secondary>
                        <f-svg-icon><icon-times /></f-svg-icon>
                    </f-button>
                    <f-button round tertiary>
                        <f-svg-icon><icon-times /></f-svg-icon>
                    </f-button>
                    <h3>Color variants</h3>
                    <f-button label="Default" class="btn-red" />
                    <f-button secondary label="Default" class="btn-red" />
                    <f-button tertiary label="Default" class="btn-red" />
                    <br />
                    <f-button disabled label="Default" class="btn-red" />
                    <f-button disabled secondary label="Default" class="btn-red" />
                    <f-button disabled tertiary label="Default" class="btn-red" />
                    <br /><br />
                    <f-button label="Default" class="btn-green" />
                    <f-button secondary label="Default" class="btn-green" />
                    <f-button tertiary label="Default" class="btn-green" />
                    <br />
                    <f-button disabled label="Default" class="btn-green" />
                    <f-button disabled secondary label="Default" class="btn-green" />
                    <f-button disabled tertiary label="Default" class="btn-green" />
                    <br /><br />
                    <f-button label="Default" class="btn-orange" />
                    <f-button secondary label="Default" class="btn-orange" />
                    <f-button tertiary label="Default" class="btn-orange" />
                    <br />
                    <f-button disabled label="Default" class="btn-orange" />
                    <f-button disabled secondary label="Default" class="btn-orange" />
                    <f-button disabled tertiary label="Default" class="btn-orange" />
                    <br /><br />
                    <f-button label="Default" class="btn-grey" />
                    <f-button secondary label="Default" class="btn-grey" />
                    <f-button tertiary label="Default" class="btn-grey" />
                    <br />
                    <f-button disabled label="Default" class="btn-grey" />
                    <f-button disabled secondary label="Default" class="btn-grey" />
                    <f-button disabled tertiary label="Default" class="btn-grey" />
                    <br /><br />
                    <div class="bac-grey-8 pa-5 darktheme">
                        <f-button label="Default" />
                        <f-button secondary label="Default" class="btn-light" />
                        <f-button tertiary label="Default" class="btn-light" />
                        <br />
                        <f-button disabled label="Default" />
                        <f-button disabled secondary label="Default" class="btn-light" />
                        <f-button disabled tertiary label="Default" class="btn-light" />
                    </div>
                </f-card>
            </section>

            <section v-if="section === 'finput'" class="finputtest">
                <h3>Input</h3>
                <f-input field-size="large" label="Large" />
                <f-input label="Default" placeholder="placehodler" />
                <f-input field-size="small" label="Small" value="value" />
                <f-input field-size="mini" label="Mini" value="value" />
                <br />
                <f-input disabled field-size="large" label="Large" />
                <f-input disabled label="Default" placeholder="placehodler" />
                <f-input disabled field-size="small" label="Small" value="value" />
                <f-input disabled field-size="mini" label="Mini" value="value" />
                <br />
                <f-input readonly field-size="large" label="Large" />
                <f-input readonly label="Default" placeholder="placehodler" />
                <f-input readonly field-size="small" label="Small" value="value" />
                <f-input readonly field-size="mini" label="Mini" value="value" />
                <br />
                <f-input invalid field-size="large" label="Large" />
                <f-input invalid label="Default" placeholder="placehodler" />
                <f-input invalid field-size="small" label="Small" value="value" />
                <f-input invalid field-size="mini" label="Mini" value="value" />
                <h3>Textarea</h3>
                <f-input is-textarea cols="20" rows="5" field-size="large" label="Large" />
                <f-input is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
                <f-input is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
                <f-input is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
                <br />
                <f-input disabled is-textarea cols="20" rows="5" field-size="large" label="Large" />
                <f-input disabled is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
                <f-input disabled is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
                <f-input disabled is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
                <br />
                <f-input readonly is-textarea cols="20" rows="5" field-size="large" label="Large" />
                <f-input readonly is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
                <f-input readonly is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
                <f-input readonly is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
                <br />
                <f-input invalid is-textarea cols="20" rows="5" field-size="large" label="Large" />
                <f-input invalid is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
                <f-input invalid is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
                <f-input invalid is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />

                <br /><br />
                <f-card>
                    <h3>Input</h3>
                    <f-input field-size="large" label="Large" />
                    <f-input label="Default" placeholder="placehodler" />
                    <f-input field-size="small" label="Small" value="value" />
                    <f-input field-size="mini" label="Mini" value="value" />
                    <br />
                    <f-input disabled field-size="large" label="Large" />
                    <f-input disabled label="Default" placeholder="placehodler" />
                    <f-input disabled field-size="small" label="Small" value="value" />
                    <f-input disabled field-size="mini" label="Mini" value="value" />
                    <br />
                    <f-input readonly field-size="large" label="Large" />
                    <f-input readonly label="Default" placeholder="placehodler" />
                    <f-input readonly field-size="small" label="Small" value="value" />
                    <f-input readonly field-size="mini" label="Mini" value="value" />
                    <br />
                    <f-input invalid field-size="large" label="Large" />
                    <f-input invalid label="Default" placeholder="placehodler" />
                    <f-input invalid field-size="small" label="Small" value="value" />
                    <f-input invalid field-size="mini" label="Mini" value="value" />
                    <h3>Textarea</h3>
                    <f-input is-textarea cols="20" rows="5" field-size="large" label="Large" />
                    <f-input is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
                    <f-input is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
                    <f-input is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
                    <br />
                    <f-input disabled is-textarea cols="20" rows="5" field-size="large" label="Large" />
                    <f-input disabled is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
                    <f-input disabled is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
                    <f-input disabled is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
                    <br />
                    <f-input readonly is-textarea cols="20" rows="5" field-size="large" label="Large" />
                    <f-input readonly is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
                    <f-input readonly is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
                    <f-input readonly is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
                    <br />
                    <f-input invalid is-textarea cols="20" rows="5" field-size="large" label="Large" />
                    <f-input invalid is-textarea cols="20" rows="5" label="Default" placeholder="placehodler" />
                    <f-input invalid is-textarea cols="20" rows="5" field-size="small" label="Small" value="value" />
                    <f-input invalid is-textarea cols="20" rows="5" field-size="mini" label="Mini" value="value" />
                </f-card>
            </section>

            <section v-if="section === 'fselect'" class="fselecttest">
                <f-select label="Large" select-size="large" :data="[...fselectData2]" />
                <f-select label="Default" :data="[...fselectData2]" />
                <f-select label="Small" select-size="small" :data="[...fselectData2]" />
                <f-select label="Mini" select-size="mini" :data="[...fselectData2]" />
                <br /><br />
                <f-select disabled label="Large" select-size="large" :data="[...fselectData2]" />
                <f-select disabled label="Default" :data="[...fselectData2]" />
                <f-select disabled label="Small" select-size="small" :data="[...fselectData2]" />
                <f-select disabled label="Mini" select-size="mini" :data="[...fselectData2]" />
                <br /><br />
                <f-select invalid label="Large" select-size="large" :data="[...fselectData2]" />
                <f-select invalid label="Default" :data="[...fselectData2]" />
                <f-select invalid label="Small" select-size="small" :data="[...fselectData2]" />
                <f-select invalid label="Mini" select-size="mini" :data="[...fselectData2]" />
                <br /><br />
                <f-card>
                    <f-select label="Large" select-size="large" :data="[...fselectData2]" />
                    <f-select label="Default" :data="[...fselectData2]" />
                    <f-select label="Small" select-size="small" :data="[...fselectData2]" />
                    <f-select label="Mini" select-size="mini" :data="[...fselectData2]" />
                    <br /><br />
                    <f-select disabled label="Large" select-size="large" :data="[...fselectData2]" />
                    <f-select disabled label="Default" :data="[...fselectData2]" />
                    <f-select disabled label="Small" select-size="small" :data="[...fselectData2]" />
                    <f-select disabled label="Mini" select-size="mini" :data="[...fselectData2]" />
                    <br /><br />
                    <f-select invalid label="Large" select-size="large" :data="[...fselectData2]" />
                    <f-select invalid label="Default" :data="[...fselectData2]" />
                    <f-select invalid label="Small" select-size="small" :data="[...fselectData2]" />
                    <f-select invalid label="Mini" select-size="mini" :data="[...fselectData2]" />
                </f-card>
            </section>

            <section v-if="section === 'foption'" class="foptiontest">
                <h3>Checkbox</h3>
                <f-option type="checkbox" option-size="large" label="Large" name="checkbox1_lg" />
                <f-option type="checkbox" label="Default" name="checkbox1" />
                <f-option type="checkbox" option-size="small" label="Small" name="checkbox1_sm" />
                <f-option type="checkbox" option-size="mini" label="Mini" name="checkbox1_xs" />
                <f-option type="checkbox" checked option-size="large" label="Large" name="checkbox1_lg" />
                <f-option type="checkbox" checked label="Default" name="checkbox1" />
                <f-option type="checkbox" checked option-size="small" label="Small" name="checkbox1_sm" />
                <f-option type="checkbox" checked option-size="mini" label="Mini" name="checkbox1_xs" />
                <br /><br />
                <f-option type="checkbox" disabled option-size="large" label="Large" name="checkbox1_lg" />
                <f-option type="checkbox" disabled label="Default" name="checkbox1" />
                <f-option type="checkbox" disabled option-size="small" label="Small" name="checkbox1_sm" />
                <f-option type="checkbox" disabled option-size="mini" label="Mini" name="checkbox1_xs" />
                <f-option type="checkbox" disabled checked option-size="large" label="Large" name="checkbox1_lg" />
                <f-option type="checkbox" disabled checked label="Default" name="checkbox1" />
                <f-option type="checkbox" disabled checked option-size="small" label="Small" name="checkbox1_sm" />
                <f-option type="checkbox" disabled checked option-size="mini" label="Mini" name="checkbox1_xs" />
                <h3>Radio</h3>
                <div class="gridauto">
                    <span class="par-4">
                        Large <br />
                        <f-option checked type="radio" label="123" option-size="large" name="radio1_lg" value="10" />
                        <f-option type="radio" option-size="large" name="radio1_lg" value="20" />
                    </span>
                    <span class="par-4">
                        Default <br />
                        <f-option type="radio" name="radio1" value="10" />
                        <f-option checked type="radio" name="radio1" value="20" />
                    </span>
                    <span class="par-4">
                        Small <br />
                        <f-option checked type="radio" option-size="small" name="radio1_sm" value="10" />
                        <f-option type="radio" option-size="small" name="radio1_sm" value="20" />
                    </span>
                    <span class="par-4">
                        Mini <br />
                        <f-option type="radio" option-size="mini" name="radio1_xs" value="10" />
                        <f-option checked type="radio" option-size="mini" name="radio1_xs" value="20" />
                    </span>
                </div>
                <br />
                <div class="gridauto">
                    <span class="par-4">
                        Large <br />
                        <f-option
                            disabled
                            checked
                            type="radio"
                            label="123"
                            option-size="large"
                            name="dradio1_lg"
                            value="10"
                        />
                        <f-option disabled type="radio" option-size="large" name="dradio1_lg" value="20" />
                    </span>
                    <span class="par-4">
                        Default <br />
                        <f-option disabled type="radio" name="dradio1" value="10" />
                        <f-option disabled checked type="radio" name="dradio1" value="20" />
                    </span>
                    <span class="par-4">
                        Small <br />
                        <f-option disabled checked type="radio" option-size="small" name="dradio1_sm" value="10" />
                        <f-option disabled type="radio" option-size="small" name="dradio1_sm" value="20" />
                    </span>
                    <span class="par-4">
                        Mini <br />
                        <f-option disabled type="radio" option-size="mini" name="dradio1_xs" value="10" />
                        <f-option disabled checked type="radio" option-size="mini" name="dradio1_xs" value="20" />
                    </span>
                </div>
                <br /><br />
                <f-card>
                    <h3>Checkbox</h3>
                    <f-option type="checkbox" option-size="large" label="Large" name="checkbox1_lg" />
                    <f-option type="checkbox" label="Default" name="checkbox1" />
                    <f-option type="checkbox" option-size="small" label="Small" name="checkbox1_sm" />
                    <f-option type="checkbox" option-size="mini" label="Mini" name="checkbox1_xs" />
                    <f-option type="checkbox" checked option-size="large" label="Large" name="checkbox1_lg" />
                    <f-option type="checkbox" checked label="Default" name="checkbox1" />
                    <f-option type="checkbox" checked option-size="small" label="Small" name="checkbox1_sm" />
                    <f-option type="checkbox" checked option-size="mini" label="Mini" name="checkbox1_xs" />
                    <br /><br />
                    <f-option type="checkbox" disabled option-size="large" label="Large" name="checkbox1_lg" />
                    <f-option type="checkbox" disabled label="Default" name="checkbox1" />
                    <f-option type="checkbox" disabled option-size="small" label="Small" name="checkbox1_sm" />
                    <f-option type="checkbox" disabled option-size="mini" label="Mini" name="checkbox1_xs" />
                    <f-option type="checkbox" disabled checked option-size="large" label="Large" name="checkbox1_lg" />
                    <f-option type="checkbox" disabled checked label="Default" name="checkbox1" />
                    <f-option type="checkbox" disabled checked option-size="small" label="Small" name="checkbox1_sm" />
                    <f-option type="checkbox" disabled checked option-size="mini" label="Mini" name="checkbox1_xs" />
                    <h3>Radio</h3>
                    <div class="gridauto">
                        <span class="par-4">
                            Large <br />
                            <f-option
                                checked
                                type="radio"
                                label="123"
                                option-size="large"
                                name="radio2_lg"
                                value="10"
                            />
                            <f-option type="radio" option-size="large" name="radio2_lg" value="20" />
                        </span>
                        <span class="par-4">
                            Default <br />
                            <f-option type="radio" name="radio2" value="10" />
                            <f-option checked type="radio" name="radio2" value="20" />
                        </span>
                        <span class="par-4">
                            Small <br />
                            <f-option checked type="radio" option-size="small" name="radio2_sm" value="10" />
                            <f-option type="radio" option-size="small" name="radio2_sm" value="20" />
                        </span>
                        <span class="par-4">
                            Mini <br />
                            <f-option type="radio" option-size="mini" name="radio2_xs" value="10" />
                            <f-option checked type="radio" option-size="mini" name="radio2_xs" value="20" />
                        </span>
                    </div>
                    <br />
                    <div class="gridauto">
                        <span class="par-4">
                            Large <br />
                            <f-option
                                disabled
                                checked
                                type="radio"
                                label="123"
                                option-size="large"
                                name="dradio2_lg"
                                value="10"
                            />
                            <f-option disabled type="radio" option-size="large" name="dradio2_lg" value="20" />
                        </span>
                        <span class="par-4">
                            Default <br />
                            <f-option disabled type="radio" name="dradio2" value="10" />
                            <f-option disabled checked type="radio" name="dradio2" value="20" />
                        </span>
                        <span class="par-4">
                            Small <br />
                            <f-option disabled checked type="radio" option-size="small" name="dradio2_sm" value="10" />
                            <f-option disabled type="radio" option-size="small" name="dradio2_sm" value="20" />
                        </span>
                        <span class="par-4">
                            Mini <br />
                            <f-option disabled type="radio" option-size="mini" name="dradio2_xs" value="10" />
                            <f-option disabled checked type="radio" option-size="mini" name="dradio2_xs" value="20" />
                        </span>
                    </div>
                </f-card>
            </section>

            <section v-if="section === 'ftogglebutton'" class="ftogglebuttontest">
                <f-toggle-button option-size="large" label="Large" name="togglebtn1_lg" />
                <f-toggle-button label="Default" name="togglebtn1" />
                <f-toggle-button option-size="small" label="Small" name="togglebtn1_sm" />
                <f-toggle-button option-size="mini" label="Mini" name="togglebtn1_xs" />
                <f-toggle-button checked option-size="large" label="Large" name="togglebtn1_lg" />
                <f-toggle-button checked label="Default" name="togglebtn1" />
                <f-toggle-button checked option-size="small" label="Small" name="togglebtn1_sm" />
                <f-toggle-button checked option-size="mini" label="Mini" name="togglebtn1_xs" />
                <br /><br />
                <f-toggle-button disabled option-size="large" label="Large" name="togglebtn1_lg" />
                <f-toggle-button disabled label="Default" name="togglebtn1" />
                <f-toggle-button disabled option-size="small" label="Small" name="togglebtn1_sm" />
                <f-toggle-button disabled option-size="mini" label="Mini" name="togglebtn1_xs" />
                <f-toggle-button disabled checked option-size="large" label="Large" name="togglebtn1_lg" />
                <f-toggle-button disabled checked label="Default" name="togglebtn1" />
                <f-toggle-button disabled checked option-size="small" label="Small" name="togglebtn1_sm" />
                <f-toggle-button disabled checked option-size="mini" label="Mini" name="togglebtn1_xs" />
                <br /><br />
                <f-card>
                    <f-toggle-button option-size="large" label="Large" name="togglebtn1_lg" />
                    <f-toggle-button label="Default" name="togglebtn1" />
                    <f-toggle-button option-size="small" label="Small" name="togglebtn1_sm" />
                    <f-toggle-button option-size="mini" label="Mini" name="togglebtn1_xs" />
                    <f-toggle-button checked option-size="large" label="Large" name="togglebtn1_lg" />
                    <f-toggle-button checked label="Default" name="togglebtn1" />
                    <f-toggle-button checked option-size="small" label="Small" name="togglebtn1_sm" />
                    <f-toggle-button checked option-size="mini" label="Mini" name="togglebtn1_xs" />
                    <br /><br />
                    <f-toggle-button disabled option-size="large" label="Large" name="togglebtn1_lg" />
                    <f-toggle-button disabled label="Default" name="togglebtn1" />
                    <f-toggle-button disabled option-size="small" label="Small" name="togglebtn1_sm" />
                    <f-toggle-button disabled option-size="mini" label="Mini" name="togglebtn1_xs" />
                    <f-toggle-button disabled checked option-size="large" label="Large" name="togglebtn1_lg" />
                    <f-toggle-button disabled checked label="Default" name="togglebtn1" />
                    <f-toggle-button disabled checked option-size="small" label="Small" name="togglebtn1_sm" />
                    <f-toggle-button disabled checked option-size="mini" label="Mini" name="togglebtn1_xs" />
                </f-card>
            </section>

            <section v-if="section === 'fform'" class="fformtest">
                <f-form style="max-width: 600px">
                    <div class="mab-5">
                        <f-form-input type="text" label="text" name="text" />
                        <f-form-input type="email" label="email" name="email" />
                        <f-form-input type="number" label="number" name="number" />
                        <f-form-input type="date" label="date" name="date" />
                        <f-form-input type="time" label="time" name="time" />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="textarea" label="textarea" name="textarea" />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="passwordfield" label="passwordfield" name="passwordfield" />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="slider" label="slider" name="slider" use-lower-fill-bar step="10" />
                    </div>
                    <div class="mab-5">
                        <f-form-input
                            type="select"
                            label="select"
                            name="select"
                            :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: 1 },
                                { label: 'Option 2', value: 2 },
                                { label: 'Option 3', value: 3 },
                            ]"
                        />
                        <f-form-input
                            type="dropdownlistbox"
                            label="dropdownlistbox"
                            name="dropdownlistbox"
                            :data="[
                                { label: '---', value: '' },
                                { label: 'Option 1', value: 1 },
                                { label: 'Option 2', value: 2 },
                                { label: 'Option 3', value: 3 },
                            ]"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="checkbox" label="checkbox" name="checkbox" />
                        <br />
                        <f-form-input
                            type="checkboxgroup"
                            label="checkboxgroup"
                            name="checkboxgroup"
                            column
                            :data="{ '10': 'Checkbox 1', '20': 'Checkbox 2' }"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input type="radio" label="radio" value="10" name="radio" />
                        <f-form-input type="radio" label="Radio 2" value="20" name="radio" />
                        <br />
                        <f-form-input
                            type="radiogroup"
                            label="radiogroup"
                            name="radiogroup"
                            column
                            :data="{ '10': 'Radio 1', '20': 'Radio 2', '30': 'Radio 3' }"
                        />
                    </div>
                    <div class="mab-5">
                        <f-form-input
                            type="listbox"
                            name="listbox"
                            label="Listbox"
                            :data="[
                                { label: 'item 100', value: '100' },
                                { label: 'item 200', id: 'myid3', value: '200' },
                                { label: 'item 300 Lorem ipsum', value: '300' },
                            ]"
                        />
                    </div>
                </f-form>
            </section>
        </main>
    </div>
</template>

<script>
import IconTimes from 'fantom-vue-components/src/components/icons/IconTimes.vue';
import FInput from 'fantom-vue-components/src/components/FInput/FInput.vue';
import FOption from '../../../src/components/FOption/FOption.vue';
import FSelect from '../../../src/components/FSelect/FSelect.vue';
import FButton from '../../../src/components/FButton/FButton.vue';
import FToggleButton from '../../../src/components/FToggleButton/FToggleButton.vue';
import FSvgIcon from '../../../src/components/FSvgIcon/FSvgIcon.vue';

const SECTION_KEY = 'playgroundsection';

export default {
    name: 'Playground',

    components: { FSvgIcon, FToggleButton, FButton, FSelect, FOption, FInput, IconTimes },

    data() {
        return {
            section: 'headings',
            fselectData: [
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2 },
                { label: 'Option 3', value: 3 },
            ],
            fselectData2: [
                { label: 'Select an option', value: null, disabled: true },
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2 },
                { label: 'Option 3', value: 3 },
            ],
        };
    },

    mounted() {
        const section = window.sessionStorage.getItem(SECTION_KEY);

        if (section) {
            this.section = section;
        }
    },

    methods: {
        onNavClick(_event) {
            const section = _event.target.getAttribute('data-section');

            if (section) {
                window.sessionStorage.setItem(SECTION_KEY, section);

                this.section = section;

                _event.preventDefault();
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
