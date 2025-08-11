import type { Metadata } from 'next';

import Layout from '../../components/Layout';
import { Heading, Section } from '../../components/Pages';
import {
  olItemStyle,
  olLatinStyle,
  olRomanStyle,
} from '../../components/Pages/styles.css';

export const metadata: Metadata = {
  title: 'Terms & Conditions - S Cubed',
  description:
    "Read S Cubed's Terms and Conditions outlining software use, payment terms, data rights, legal responsibilities, and compliance requirements.",
};

export default function TermsPage() {
  return (
    <Layout>
      <Heading>Terms & Conditions</Heading>
      <h3>Spectrum Solutions Software</h3>
      <Section>
        The following Terms of Use (“TOU”) form an agreement by and between us,
        SCubed (“Company”) (Company is referred to herein without limitation as
        us, we, etc.), and <strong> you (the “Customer”).</strong> Company and
        you are referred to herein individually as a <strong>“Party”</strong>
        and collectively as the <strong>“Parties.”</strong> Your subscription to
        the Software and Services or use of the same constitutes its acceptance
        and acknowledgement all the terms set forth in these TOU.
      </Section>
      <h3>Purpose and Scope</h3>
      <Section>
        a) Terms of Use. This Agreement establishes the terms and conditions
        applicable to all software, services, and products that you license from
        us.
      </Section>
      <h3>Financial &amp; Payment Terms</h3>
      <Section>
        a) <strong>Fees and Payment Terms.</strong> Fees and payment terms are
        specified in the Software and Services and must be agreed to prior to
        subscription and use of the Software and Services. You agree to be
        charged for all services as invoiced. Prior to and during the
        subscription and use of the Software and Services, and until final
        payment for those Software and Services, you must submit and maintain
        current and valid payment information. You shall maintain sufficient
        funds to make payment to us as invoiced. Unless otherwise specified, all
        payments are due upon receipt, and collected by automatic debit from the
        payment method that you have provided. All payments are non-refundable
        and must be made in US dollars. Prices and fees are subject to taxes,
        other government mandated fees or assessments, and delivery charges, as
        applicable. You will make payments by Automated Clearinghouse (“ACH”) or
        credit card. If your ACH or credit card payment fails for any reason, we
        will try to process it again immediately. We will attempt this three
        times in total, and you will incur a charge from us for each
        unsuccessful attempt. Interest accrues on past due balances at the
        lesser of 3% per month or the highest rate allowed by law. Credit card
        payments may be subject to an additional merchant’s fee if stated.
        Unless expressly provided for otherwise, fees paid or payable for
        Software and Services are not contingent under any circumstances upon
        the performance of any other Services and may not be withheld. Payment
        of fees are under no circumstances subject or conditioned by the
        delivery of future products or functionality by Company. Further, you
        shall reimburse us for each non-sufficient fund charge we incur for any
        payment made by you. All payments are nonrefundable, and any credit is
        offered is in our sole discretion.
      </Section>
      <Section>
        b) <strong>Taxes</strong>. Unless expressly provided for otherwise, the
        prices listed for subscription do not include taxes. You agree to pay
        any taxes, other than those based on our net income, arising out of the
        Agreement. If you are tax-exempt, you agree to provide us a copy of your
        tax-exempt certificate prior to using the Software and Services. You
        agree to indemnify us from any liability or expense incurred as a result
        of our failure or delay in paying taxes due.
      </Section>
      <Section>
        c) <strong>Pass Through Fees</strong>. You agree to pay for any increase
        in fees that are charged to us by third parties and if the increase is
        due to reasons outside of our control.
      </Section>
      <Section>
        d) <strong>Term and Increases in Fees.</strong> The agreement between
        you and us is month-to-month. We reserve the right to increase our fees
        at any time by providing you with fifteen (15) days written notice.
      </Section>
      <Section>
        e) <strong>Payment Disputes.</strong> You must indicate that you are
        disputing any fees or expenses, in writing, within five (5) business
        days of receipt of the invoice specifying such fees or expenses. Prior
        to taking any formal legal action or submitting a complaint or dispute
        with a third party, you agree to attempt to resolve any payment dispute
        with us directly through our then-current support line for a period of
        thirty (30) days.
      </Section>
      <Section>
        f) <strong>Minimums</strong>. You understand and agree that fees are
        based on the number of licenses purchased, and that the number of
        licenses purchased represents the minimum amount that you have committed
        to for the relevant term and cannot be decreased during such term. In
        the event your actual need exceeds the number of licenses for the
        Software and Services, then you must purchase additional licenses at
        Company’s then current rates.
      </Section>
      <strong>Confidentiality</strong>
      <Section>
        a) <strong>Non-Disclosure.</strong> Each Party will protect the other
        Party’s Confidential Information from unauthorized dissemination and use
        the same degree of care that each Party uses to protect its own
        Confidential Information, but in no event less than a reasonable amount
        of care. Neither Party will use Confidential Information of the other
        Party for purposes other than those necessary to further the purposes of
        the Agreement or as otherwise authorized herein. Neither Party will
        disclose to third Parties Confidential Information without prior written
        consent of the other Party except as authorized herein.
      </Section>
      <Section>
        b) <strong>Compelled Disclosure.</strong> The receiving Party may
        disclose Confidential Information of the disclosing Party if it’s
        compelled by law to do so, provided the receiving Party gives the
        disclosing Party prior notice of such compelled disclosure (to the
        extent legally permitted) and reasonable assistance, at the disclosing
        Party’s cost, if the disclosing Party wishes to contest the disclosure.
      </Section>
      <Section>
        c) <strong>Copyright Placement.</strong> Our placement of a copyright
        notice on any such portion of any Software and Services will not be
        construed to mean that such portion has been published and will not
        derogate from any claim that such portion contains proprietary and
        confidential information of ours.
      </Section>
      <Section>
        d) <strong>Injunctive Relief.</strong> The Parties agree that any
        unauthorized disclosure of Confidential Information may cause immediate
        and irreparable injury to the Disclosing Party and that, in the event of
        such breach, the Disclosing Party will be entitled, in addition to any
        other available remedies, to seek immediate injunctive and other
        equitable relief, without bond and without the necessity of showing
        actual monetary damage.
      </Section>
      <Section>
        e) <strong>System Monitoring.</strong> We, our staff and development
        teams, and Clearinghouses may monitor your usage, performance, and
        operation of the Software and Services using electronic, remote, and
        other means without notice to you.
      </Section>
      <Section>
        f) <strong>Non-disparagement.</strong> You agree that you will not,
        either on your own account or directly or indirectly in conjunction with
        or on behalf of any other person or entity, disparage, defame, impugn,
        damage, or assail our reputation; nor shall you make any communication
        about us that would make the recipient likely to question the integrity,
        competence, good character, professionalism, or product quality.
      </Section>
      <strong>Reservation of Rights and Restrictions</strong>
      <Section>
        a) <strong>Reservation of Rights.</strong> All rights not expressly
        granted in the Agreement are reserved by us and our licensors. You
        acknowledge that:
        <ol className={olRomanStyle}>
          <li className={olItemStyle}>
            all Protected Materials are licensed and not sold;
          </li>
          <li className={olItemStyle}>
            you acquire only the right to use the Protected Materials and we and
            our licensors shall retain sole and exclusive ownership of and all
            rights, title, and interest in the Protected Materials,
            <ol className={olLatinStyle}>
              <li className={olItemStyle}>
                Intellectual Property embodied or associated with the Protected
                Materials,
              </li>
              <li className={olItemStyle}>
                deliverables and work product associated with the Protected
                Materials, and{' '}
              </li>
              <li className={olItemStyle}>
                all copies and derivative works thereof; and
              </li>
            </ol>
          </li>
          <li className={olItemStyle}>
            the Protected Materials, including the source and executable code,
            logic and structure, constitute valuable trade secrets of ours and
            our licensors. You agree to secure and protect the Protected
            Materials consistent with the maintenance of our and our licensors’
            rights. You shall reimburse us for any and all expenses that we may
            incur (including interest, attorneys’ fees and other legal expenses)
            in connection with our efforts to enforce our rights against you
            with respect to the Protected Materials, or any of our Intellectual
            Property Rights in the event we prevail in such enforcement efforts.
          </li>
        </ol>
      </Section>
      <Section>
        b) <strong>Restrictions.</strong> You shall not:
        <ol className={olRomanStyle}>
          <li className={olItemStyle}>
            sell, resell, distribute, host, lease, rent, license or sublicense,
            in whole or in part, the Protected Materials;
          </li>
          <li className={olItemStyle}>
            copy, decipher, decompile, disassemble, reverse assemble, modify,
            translate, reverse engineer or otherwise attempt to derive source
            code, algorithms, specifications, architecture, structure or other
            elements of the Protected Materials, in whole or in part, for
            competitive purposes or otherwise;
          </li>
          <li className={olItemStyle}>
            allow access to, provide, divulge or make available the Protected
            Materials to any user other than those who have licenses to access;
          </li>
          <li className={olItemStyle}>
            write or develop any derivative works based upon the Protected
            Materials;
          </li>
          <li className={olItemStyle}>
            modify, adapt, translate or otherwise make any changes to the
            Protected Materials or any part thereof;
          </li>
          <li className={olItemStyle}>
            use the Protected Materials to provide processing services to third
            Parties, or otherwise use the same on a ‘service bureau’ basis;
          </li>
          <li className={olItemStyle}>
            otherwise use or copy the Protected Materials except as expressly
            permitted herein; or
          </li>
          <li className={olItemStyle}>
            remove from any Protected Materials identification, patent,
            copyright, trademark or other notices or circumvent or disable any
            security devices functionality or features. For the avoidance of
            doubt, you may copy or reproduce Protected Materials for the limited
            purpose of creating internal training materials for your internal
            use in connection with your use of the Software and Services,
            provided that such materials are destroyed upon the termination of
            the Agreement. You shall ensure that all users of the Protected
            Materials comply with the terms and conditions of the Agreement and
            shall promptly notify us of any actual or suspected violation.
            Further, you will cooperate with us with respect to investigation
            and enforcement of the Agreement.
          </li>
        </ol>
      </Section>
      <h3>Your Responsibilities.</h3>
      <Section>
        a) <strong>Customer Equipment.</strong> You are responsible for
        obtaining, deploying, and maintaining all computer hardware, software,
        modems, routers, or other equipment necessary for your Users to access
        and use the Software and Services as described in the Documentation. If
        any hardware, equipment, or third-party software supplied by you impairs
        your system, your use of the Software and Services, or causes the
        Software and Services to fail, not to operate properly in connection
        with your system, we shall have no liability for such impairment,
        failure, or improper operation.
      </Section>
      <Section>
        b) <strong>Users’ Compliance.</strong> You assume sole responsibility
        and liability for any Users’ compliance with the terms and conditions of
        the TOU and Agreement. You further assume sole responsibility and
        liability for results obtained from the use of Protected Materials and
        for conclusions drawn from such use. We shall have no liability for any
        claims, losses, or damages arising out of or in connection with your or
        any of your Users use of the Protected Materials, any third-party
        products, services, software, or websites that are accessed via links
        from within the Software and Services.
      </Section>
      <Section>
        c) <strong>Healthcare Providers’</strong> Responsibility. You
        acknowledge and agree that we are not a Healthcare Provider. You further
        agree and acknowledge that we do not provide 24/7, synchronous, or
        emergency alerting. In the event that Software and Services, or any
        database or any report or information generated from the Software and
        Services is used in connection with any diagnosis or treatment, you
        accept all liability for such diagnosis or treatment. You agree that the
        sole and exclusive responsibility for any medical decisions or actions
        with respect to a patient’s medical care and for determining the
        accuracy, completeness, or appropriateness of any diagnostic, clinical,
        or medical information provided by the Software or the Services and any
        underlying database resides solely with you and the responsible
        Healthcare Provider. We assume no responsibility for how such
        information is used. The choice with respect to when and how to use the
        Software and Services and any database is your responsibility and the
        same is to be used at your discretion. You understand and agree that the
        responsibility for medical treatment rests with you. None of the
        databases, Software, or Services provided hereunder are intended in any
        way to suggest any procedures, medication, or physical findings for the
        patient or eliminate, replace, or substitute for, in whole or in part,
        your judgment and analysis of a patient’s condition. You are wholly
        responsible for obtaining all required patient consents or other
        authorizations necessary for your or any Users’ use of the Software and
        Services, including, without limitation, clinical data exchange or
        population health management services. You represent, warrant, and
        covenant that you shall comply with all relevant laws relating to the
        privacy and security of PHI and Personally Identifiable Information
        (“PII”).
      </Section>
      <Section>
        d) <strong>Payers, Billing, and Overpayment.</strong> You acknowledge
        and agree that you are solely responsible for refunding any overpayment
        from a federal, state, or commercial payer, and are also responsible for
        complying with any unclaimed property laws. Unless specified separately
        in a Purchase Schedule, statement of work, or other amendment to the
        Agreement, you shall be solely responsible for billing any claims with
        the appropriate payers. Further, unless specified separately in a
        Purchase Schedule, statement of work, or other amendment to the
        Agreement, you shall be solely responsible for submitting reports and
        other data to applicable payers and other entities that may request it,
        such as auditors.
      </Section>
      <Section>
        e) All Software and Services must be accessed from within the United
        States. You agree and acknowledge that the Software and Services are
        designed for use only in the United States. In the event you access
        Software and Services outside of the United States, you do so at your
        own risk, and indemnify Company from any cause of action, whether in
        law, equity, or administrative that arises from such use. Accessing the
        Software from outside the United States gives us the right to terminate
        the Agreement.
      </Section>
      <Section>
        f) Each individual, whether an employee, contractor, subcontractor,
        affiliate, partner, or otherwise, who accesses or uses any Software and
        Services on your behalf must have their own Access Credentials. Users
        may not share access credentials with any other individual.
      </Section>
      <strong>Your Data.</strong>
      <Section>
        a) <strong>Limited License.</strong> You hereby grant us a limited,
        non-exclusive, royalty-free, worldwide license to use, reproduce,
        aggregate, and modify Customer Data and to perform all acts as necessary
        for us to provide the Software and Services to you, subject to the
        limitations regarding PHI. Such acts include, but are not limited to,
        improving our products, marketing to you, conducting analyses of our
        customers to identify product or service’s needs, or conducting research
        or engaging in public health activities. Such license shall also permit
        us to use or modify the Customer Data for the purposes of creating
        De-identified Data from PII and PHI contained in Customer Data. We
        intend to use De-identified, aggregated with the de-identified data of
        other customers, to enable us to provide our customers more targeted,
        accurate, and useful insights.
      </Section>
      <Section>
        b) <strong>Customer Data.</strong> As between you and us, all right,
        title, and interest in the Customer Data belong to and are retained
        solely by you.
      </Section>
      <Section>
        c) <strong>Feedback License.</strong> We own all right, title, and
        interest in and to any suggestion, enhancement, request, recommendation,
        or other feedback related to the Software and Services provided by you.
        Feedback shall not be considered your Confidential Information pursuant
        to the Agreement.
      </Section>
      <h3>Representations and Warranties</h3>
      <Section>
        a) <strong>Compliance Warranty.</strong> Each Party represents, warrants
        and covenants that such Party has conducted reasonable inquiry and based
        thereon is informed and believes that:{' '}
        <ol className={olLatinStyle}>
          <li className={olItemStyle}>
            it has the full power and authority to enter into the Agreement and
            to perform its obligations hereunder, without the need for any
            consents, approvals or immunities not yet obtained;{' '}
          </li>
          <li className={olItemStyle}>
            its acceptance of and performance under the Agreement will not
            breach any oral or written agreement with any third party or any
            obligation owed by it to any third party to keep any information or
            materials in confidence or in trust; and{' '}
          </li>
          <li className={olItemStyle}>
            it complies with and will comply with any and all applicable local,
            state, and/or national laws or regulations applicable to such Party,
            including, without limitation, those related to PHI, Covered
            Entities, and Business Associates as each term is defined under
            HIPAA, and to any other laws or regulations regarding data privacy
            and transmission of personal data.
          </li>
        </ol>
      </Section>
      <Section>
        b) <strong>HIPAA.</strong> Each Party, to the extent applicable, will
        comply with laws and regulations applicable to the privacy and security
        of individually identifiable health information, including but not
        limited to state laws and regulations and the Health Insurance
        Portability and Accountability Act (“HIPAA”), the Health Information
        Technology for Economic and Clinical Health Act (“HITECH”), and/or
        regulations promulgated thereunder (“HIPAA Regulations”). State law,
        HIPAA, HITECH, HIPAA Regulations and other federal laws and regulations
        are hereafter referred to collectively as “Privacy Laws”. You shall
        execute The Business Associate Agreement, following the instructions
        provided by Company prior to using the Software and/or Services in
        conjunction with any PHI. The BAA further describes the Parties’
        obligations with respect to compliance with HIPAA, HITECH, and HIPAA
        Regulations.
      </Section>
      <Section>
        c) <strong>Warranty.</strong> We warrant that, for the Term, the
        Software and Services will operate in all material respects in
        conformity with the functional specifications described in the
        Documentation. If the Software and Services do not perform or are not
        performed as warranted during the Term, we shall use commercially
        reasonable efforts to correct errors. You shall promptly notify us in
        writing of its claim. Provided that such claim is determined by us to be
        our responsibility, we shall, within 60 days of its receipt of
        Customer&#39;s written notice,{' '}
        <ol className={olRomanStyle}>
          <li className={olItemStyle}> correct such error; </li>
          <li className={olItemStyle}>
            provide you with a plan reasonably acceptable for correcting the
            error; or{' '}
          </li>
          <li className={olItemStyle}>if neither </li>{' '}
          <ol className={olRomanStyle}>
            <li className={olItemStyle}>nor </li>
            <li className={olItemStyle}>
              can be accomplished with commercially reasonable efforts from us,
              then we may, at our election terminate the Agreement.
            </li>
          </ol>{' '}
        </ol>
        The preceding warranty cure shall constitute our entire liability and
        your exclusive remedy for cure of the warranty set forth herein.
      </Section>
      <Section>
        d) <strong>Third-party Products.</strong> You acknowledge that certain
        portions of the Software and Services may contain third-party products
        and services (“Third Party Products”). We may add and/or substitute
        functionally equivalent products for any Third Party Products in the
        event of product unavailability, end-of-life, or changes to software
        requirements. We make no warranty with respect to any Third Party
        Products. Your sole remedy with respect to such Third Party Products
        shall be pursuant to the original licensor’s warranty, if any, to us, to
        the extent permitted by the original licensor. Third Party Products are
        made available on an “AS IS, AS AVAILABLE” BASIS.
      </Section>
      <h3>Disclaimers and Limitation of Liability</h3>
      <Section>
        a) <strong> Warranty Disclaimer.</strong> THE WARRANTIES, IF ANY, SET
        FORTH IN THE AGREEMENT ARE IN LIEU OF ANY OTHER WARRANTY. WE EXPRESSLY
        DISCLAIM ANY AND ALL WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, ORAL OR
        WRITTEN, INCLUDING WITHOUT LIMITATION, ANY WARRANTY AS TO THE ACCURACY
        OR USEFULNESS OF THE SOFTWARE AND SERVICES, PROFESSIONAL SERVICES, OR
        CLEARINGHOUSE SERVICES OR ANY WARRANTY OF TITLE, MERCHANTABILITY OR
        FITNESS FOR A PARTICULAR PURPOSE OR ARISING BY STATUTE, LAW, COURSE OF
        DEALING, CUSTOM, PAST PRACTICE, OR TRADE USE. WITHOUT LIMITING THE
        FOREGOING, WE MAKE NO WARRANTY OF ANY KIND THAT THE SOFTWARE AND
        SERVICES, OR DATABASE, OR STORAGE OF DATA, OR ANY PRODUCTS OR RESULTS OF
        THE USE THEREOF OR ANY PROFESSIONAL SERVICES OR CLEARINGHOUSE SERVICES,
        WILL MEET YOUR OR ANY OTHER PERSON’S REQUIREMENTS, OPERATE WITHOUT
        INTERRUPTION, ACHIEVE ANY INTENDED RESULT, BE COMPATIBLE OR WORK WITH
        ANY SOFTWARE, SYSTEM, OR OTHER SERVICES, OR BE SECURE, ACCURATE,
        COMPLETE, FREE OF VIRUSES OR OTHER HARMFUL CODE, ERROR-FREE, OR THAT THE
        RESULTS OBTAINED FROM THE SOFTWARE AND SERVICES OR PROCESSING OF DATA
        (OR ANY SOFTWARE OR OTHER CONTENT CONTAINED IN OR PROVIDED THROUGH THE
        SOFTWARE AND SERVICES) ARE ACCURATE OR RELIABLE. FOR THE AVOIDANCE OF
        ANY DOUBT, WE FURTHER EXPRESSLY DISCLAIM ANY WARRANTIES OR
        REPRSENTATIONS RELATED TO THE ELIGIBILITY FOR, TIMING, AND AMOUNT OF
        REIMBURSEMENT FROM ANY FEDERAL, STATE, OR COMMERCIAL PAYER THAT MAY
        RESULT FROM YOUR USE OF THE SOFTWARE AND SERVICES, PROFESSIONAL
        SERVICES, OR CLEARINGHOUSE SERVICES.
        <strong>
          &nbsp; WE RESERVE THE RIGHT TO MAKE CHANGES, CORRECTIONS, AND
          IMPROVEMENTS TO THE PROTECTED MATERIALS AT ANY TIME AND WITHOUT
          NOTICE.
        </strong>
      </Section>
      <Section>
        b) YOU ASSUME ALL RESPONSIBILITY FOR THE SELECTION OF THE SOFTWARE AND
        SERVICES, AND OTHER PRODUCTS AND SERVICES PROVIDED HEREUNDER TO ACHIEVE
        THE YOUR INTENDED RESULTS. YOU ACKNOWLEDGE THAT USE OF OR CONNECTION TO
        THE INTERNET PROVIDES THE OPPORTUNITY FOR UNAUTHORIZED THIRD PARTIES TO
        CIRCUMVENT SECURITY PRECAUTIONS AND ILLEGALLY GAIN ACCESS TO THE
        SERVICES AND SOFTWARE AND SERVICES, AND CUSTOMER DATA, AND THAT NO FORM
        OF ENCRYPTION IS FOOLFULL PROOF. ACCORDINGLY, WE CANNOT AND DO NOT
        GUARANTEE THE PRIVACY, SECURITY, OR AUTHENTICITY OF ANY INFORMATION SO
        TRANSMITTED OVER OR STORED IN ANY SYSTEM CONNECTED TO THE INTERNET.
      </Section>
      <Section>
        c) <strong>Excluded Damages.</strong> IN NO EVENT WILL WE, OUR
        LICENSORS, CLEARINGHOUSES, DATA CENTERS, OR SUPPLIERS BE LIABLE TO YOU
        OR YOUR USERS OR ANY OTHER THIRD PARTIES FOR ANY INDIRECT, SPECIAL,
        INCIDENTAL, EXEMPLARY, PUNITIVE, TREBLE, OR CONSEQUENTIAL DAMAGES
        (INCLUDING, WITHOUT LIMITATION, LOSS OF BUSINESS, REVENUE, PROFITS,
        STAFF TIME, GOODWILL, USE, DATA, OR OTHER ECONOMIC ADVANTAGE), WHETHER
        BASED ON BREACH OF CONTRACT, BREACH OF WARRANTY, TORT (INCLUDING
        NEGLIGENCE), PRODUCT LIABILITY, OR OTHERWISE, WHETHER OR NOT WE HAVE
        BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
      </Section>
      <Section>
        d) <strong>Limitation of Liability.</strong> TO THE FULLEST EXTENT
        PERMITTED BY LAW, OUR, OUR LICENSORS’, CLEARNINGHOUSES’, DATA CENTERS’,
        AND SUPPLIERS’ TOTAL LIABILITY (INLCUDING ATTORNEYS’ FEES AWARDED UNDER
        THE AGREEMENT) TO YOU FOR ANY CLAIM BY YOU OR ANY THIRD PARTIES UNDER
        THE AGREEMENT, WILL BE LIMITED TO THE FEES PAID TO US UNDER THIS
        AGREEMENT DURING THE ONE (1) MONTH PRIOR TO THE OCCCURRENCE OF THE EVENT
        GIVING RISE TO SUCH CLAIM.
      </Section>
      <Section>
        e) <strong>Limitation of Action.</strong> No action (regardless of form)
        arising out of the Agreement between you and us may be commenced by you
        against us more than one (1) year after the cause of action arose.
      </Section>
      <Section>
        f) <strong>Transaction Accuracy.</strong> If any information received
        from you and transmitted to a payer, is not accurate as a result of a
        failure by us or any Clearinghouse or third-party services provider,
        then our sole obligation and liability shall be to use commercially
        reasonable efforts to re- perform the transaction. Neither us, any
        Clearinghouse, nor any third-party services provider shall be liable for
        any actual or alleged monetary loss resulting from the use or inability
        to use any Software and Services or Clearinghouse Services that
        facilitate transactions. Any claims under this section must be asserted
        in writing within thirty (30) days after the transmission of the
        transaction on which such claim is based. You agree to promptly provide
        us any documentation reasonably requested to support such a claim under
        this section.
      </Section>
      <Section>
        g) <strong>Transaction Services Limitations.</strong> Neither us nor any
        third party services provider will have any{' '}
        <ol className={olRomanStyle}>
          <li className={olItemStyle}>
            {' '}
            responsibility for determining the accuracy of any transaction,{' '}
          </li>
          <li className={olItemStyle}>
            {' '}
            responsibility for settling disagreements or disputes between a
            payer and/or Customer, or{' '}
          </li>
          <li className={olItemStyle}>
            any liability for the acts or omissions of a payer or you.
          </li>
        </ol>
      </Section>
      <Section>
        h) <strong>Basis of the Bargain.</strong> YOU ACKNOWLEDGE AND AGREE THAT
        WE HAVE OFFERED OUR SOFTWARE AND SERVICES AND ENTERED INTO THE AGREEMENT
        TO WHICH IT IS A PARTY IN RELIANCE UPON THE WARRANTY DISCLAIMERS AND THE
        LIMITATIONS OF LIABILITY SET FORTH HEREIN, THAT THE WARRANTY DISCLAIMERS
        AND THE LIMITATIONS OF LIABILITY SET FORTH HEREIN REFLECT A REASONABLE
        AND FAIR ALLOCATION OF RISK BETWEEN YOU AND US, AND THAT THE WARRANTY
        DISCLAIMERS AND THE LIMITATIONS OF LIABILITY SET FORTH HEREIN FORM AN
        ESSENTIAL BASIS OF THE BARGAIN BETWEEN YOU AND US. YOU ACKNOWLEDGE AND
        AGREE THAT WE WOULD NOT BE ABLE TO PROVIDE THE SOFTWARE AND SERVICES TO
        YOU ON AN ECONOMICALLY REASONABLE BASIS WITHOUT THESE LIMITATIONS.
      </Section>
      <h3>Indemnification</h3>
      <Section>
        a) <strong>Indemnification by Customer.</strong> You shall indemnify and
        hold harmless Company and its officers, directors, employees and agents
        (“Company Indemnified Parties”), from and against any and all damages,
        liabilities, penalties, interest, fines, losses, costs and expenses
        (including reasonable attorneys’ fees and expenses) (“Losses”), arising,
        directly or indirectly, out of or relating to any claim, action or
        proceeding (a “Claim”) brought by a third party based on
        <ol className={olRomanStyle}>
          <li className={olItemStyle}>
            the improper use or operation of the Software and Services (and any
            third party software provided to Customer pursuant to the
            Agreement), by you or your users, including, without limitation, any
            non-authorized use of your user logins, provided, however, that you
            shall have no indemnification obligation for any claim for which the
            proximate cause was our gross negligence or willful misconduct;{' '}
          </li>
          <li className={olItemStyle}>
            a breach of the Agreement by you or any of your Users,
          </li>
          <li className={olItemStyle}>
            the accuracy, quality, integrity, legality, reliability or
            appropriateness of Customer Data or any other content or data
            introduced to the Software and Services by any User;
          </li>
          <li className={olItemStyle}>
            violation of any applicable law, rule or regulation by you or any of
            your Users,
          </li>
          <li className={olItemStyle}>
            the diagnosis and/or treatment of any of your patients or clients;
            and/or
          </li>
          <li className={olItemStyle}>
            your negligent acts or willful misconduct, or that of your
            personnel.
          </li>
        </ol>
        You will pay all Losses (whether by settlement or award after a final
        non-appealable judicial judgment) incurred by the Company Indemnified
        Parties from any such Claim.
      </Section>
      <Section>
        b) <strong>Indemnification by Company.</strong> Subject to limitations
        of liability as set forth in Section 9, we agree to defend you and your
        officers, directors, employees and agents (a “Customer Indemnified
        Party”) from and against any Claims brought by a third party resulting
        from or arising out of{' '}
        <ol className={olRomanStyle}>
          <li className={olItemStyle}>
            the unauthorized disclosure by us of PHI in breach of the Business
            Associate Agreement; and{' '}
          </li>{' '}
          <li className={olItemStyle}>
            a successful claim that the Software and Services infringes or
            misappropriates the patent, trade secret, trademark, copyright or
            other Intellectual Property Rights of any third party (an
            “Infringement Claim”).
          </li>
        </ol>{' '}
        We will pay all Losses (whether by settlement or award of by a final
        judicial judgment) incurred by the Customer Indemnified Parties from any
        such Claim.
      </Section>
      <h3>Termination</h3>
      <Section>
        a) <strong>Cancellation &amp; Renewal.</strong> The Agreement shall
        automatically renew for subsequent terms in accordance with the
        subscription that you selected, unless you cancel or modify it’s the
        subscription in advance of its termination through your subscription
        page. Failure to cancel through the subscription page will result in
        additional terms being billed until you appropriately cancel the
        subscription. All such payments are nonrefundable.
      </Section>
      <Section>
        b) <strong>Nonpayment.</strong> If you fail to make timely payments of
        any fees, (1) you shall be in material breach of the Agreement, (2) we
        shall be entitled to collect all past and current amounts due and owing,
        and to accelerate all future amounts to be due, such that all remaining
        periodic payments for the then-current term of the applicable Software
        and Services are immediately due and owing, and (3) you shall be
        responsible to pay any collection expenses, including reasonable
        attorneys’ fees, incurred by us.
      </Section>
      <Section>
        c) <strong>Suspension of Services.</strong> We will be entitled to
        suspend any or all services immediately in the event you are in breach
        of the Agreement.
      </Section>
      <Section>
        d) <strong>Material Breach &amp; Cure Period.</strong> Either Party may
        terminate the Agreement following a material breach by the other Party
        which is not cured during the Cure Period. The non- breaching Party
        shall notify the breaching Party of the breach in writing and the
        breaching Party shall have thirty (30) days (the
        <strong>“Cure Period”</strong>) to cure the breach or to provide the
        nonbreaching Party with a plan reasonably acceptable to the nonbreaching
        Party for curing the breach following receipt of the notification. If
        the breaching Party fails to cure the breach within the Cure Period or
        according to a plan reasonably acceptable to the nonbreaching Party,
        then the non-breaching Party may terminate the Agreement upon written
        notice to the breaching Party. In the event we, in our sole discretion,
        determine that you are in breach of your obligations under Section 8(a)
        or are otherwise using the Software and Services in a manner that
        violates any applicable law or regulation, we may immediately suspend
        the Software and Services upon written notice to you.
      </Section>
      <Section>
        e) <strong>Bankruptcy.</strong> We may terminate the Agreement if, with
        respect to you, there is a filing of a voluntary or involuntary petition
        in bankruptcy if such petition is not dismissed within thirty (30) days
        of such filing or upon the appointment of a receiver or trustee to take
        possession of all, or substantially all, of your assets, if such
        appointment is not terminated withing thirty (30) days.
      </Section>
      <Section>
        f) <strong>Legal Conflicts with the Agreement.</strong> We may terminate
        this Agreement if in the reasonable opinion of our legal counsel,
        termination is required to avoid a violation of law if the Agreement
        were to continue under the existing terms without the Parties mutually
        agreeing to modify its terms.
      </Section>
      <Section>
        g) <strong>Effect of Termination.</strong> Unless otherwise stated
        below, upon expiration or termination of the Agreement for any reason,
        (a) the license(s) shall terminate and you shall not use or access,
        directly or indirectly, the Software and Services; (b) our obligation to
        perform support services shall cease; and (c) all fees and other amounts
        owed to us will be immediately due and payable by you. If you have made
        any copies of our property or materials, including without limitation
        the Software and Services, you shall either destroy or return them,
        along with a signed certificate that all such copies have been either
        destroyed or returned, respectively, and that you have not retained any
        copy or any part of the Software and Services or Protected Materials has
        been retained by you in any form.
      </Section>
      <Section>
        h) <strong>Data Export.</strong> Upon termination of the Agreement, you
        shall bear the full responsibility for the migration of your data to new
        Software and Services. We, at our option, may provide data exports and
        any other assistance related to the migration of your data at our then
        current rates.
      </Section>
      <h3>Miscellaneous</h3>
      <Section>
        a) <strong>Non-solicitation and Noncompete.</strong> You acknowledge and
        agree that our employees and contractors are a valuable asset to us,
        that we expended significant resources in recruiting and training such
        employees and contractors, and that such employees and contractors are
        and would be difficult for us to replace. Accordingly, you agree that,
        for the term of the Agreement and for a period of twelve (12) months
        thereafter, that you will not offer to retain any such employee or
        contractor, whether as an employee, independent contractor or otherwise.
        In the event you breach the prohibition against solicitation, the
        parties agree that it would be difficult to determine the amount of
        actual damages that would result from such breach. The parties further
        agree that in the event you breach the provisions of this section, you
        shall pay us liquidated damages equal to one hundred (100) percent of
        such employee or contractor’s annualized compensation, which is the
        parties’ good faith estimate of the amount of damages from such breach.
        Additionally, during the Term of the Agreement and for two (2) years
        thereafter, you are prohibited from directly or indirectly creating,
        operating, or managing a service, program, legal entity, or business
        model that in any way competes with our business model or operations. A
        breach of this Section 12 will be considered a material breach of the
        Agreement and will allow for termination for cause and subsequent legal
        action.
      </Section>
      <Section>
        b) <strong>Subcontractors.</strong> We may use affiliates or
        subcontractors to perform our obligations hereunder.
      </Section>
      <Section>
        c) <strong>Notices.</strong> Any notices, requests, consents, demands or
        other communications required or permitted under the Agreement will be
        in writing and deemed to have been duly given, with respect to you, when
        emailed to the contact information and email addresses that you have
        provided in your contact information, and with respect to us, when
        delivered to:
      </Section>
      <Section>Spectrum Software Solutions, LLC</Section>
      <Section>
        At:&nbsp;
        <a style={{ color: '#7a7eed' }} href="mailto:info@scubed.io">
          info@scubed.io
        </a>
      </Section>
      <Section>1332 Kyleigh Dr.</Section>
      <Section>Salado, Tx 76571</Section>
      <Section>
        d) <strong>Amendment.</strong> We may, with thirty (30) days’ notice,
        and at our sole discretion, modify this Agreement. Your continued use of
        our Software and Services constitutes your acceptance of the modified
        Agreement.
      </Section>
      <Section>
        e) <strong>Waiver; Severability.</strong> The failure of any Party to
        insist in any one or more instances upon performance of any term of the
        Agreement will not be construed as a waiver of future performance of the
        term, and the Party’s obligations with respect to such term will
        continue in full force and effect. The provisions of the Agreement are
        severable. The invalidity or unenforceability of any term or provision
        in any jurisdiction will be construed and enforced as if it has been
        narrowly drawn so as not to be invalid, illegal or unenforceable to the
        extent possible and will in no way affect the validity or enforceability
        of any other terms or provisions in that jurisdiction or of this entire
        Agreement in that jurisdiction.
      </Section>
      <Section>
        f) <strong>Assignment.</strong> Neither Party may assign or transfer the
        Agreement without the prior written consent of the other Party, which
        shall not be unreasonably withheld; provided, however, that we may
        assign or transfer the Agreement, without your consent, to any of our
        affiliates, subsidiaries, entities controlled by or under common control
        with us, or in the event of a merger, change of control or sale of
        substantially all of our assets. The Agreement will bind the Parties and
        their respective successors and assigns and will inure to the benefit of
        the Parties and their respective permitted successors and assigns.
      </Section>
      <Section>
        g) <strong>Force Majeure.</strong> If any Party is unable to perform any
        of its obligations under the Agreement (other than payment obligations)
        because of any cause beyond the reasonable control of and not the fault
        of the Party invoking this section, including any act of God, fire,
        casualty, flood, earthquake, war, strike, lockout, epidemic, pandemic,
        destruction of production facilities, riot, insurrection or material
        unavailability, and if the non-performing Party has been unable to avoid
        or overcome its effects through the exercise of commercially reasonable
        efforts, such non-performing Party will give prompt notice to the other
        Party, and its performance will be excused, and the time for its
        performance will be extended for the period of delay or inability to
        perform due to such occurrences.
      </Section>
      <Section>
        h) <strong>Relationship of the Parties.</strong> The sole relationship
        between the Parties is that of independent contractors. The Agreement
        will not create a joint venture, partnership, agency, employment or
        other relationship between the Parties. Nothing in the Agreement will be
        construed to create any rights or obligations except among the Parties;
        and no person or entity will be regarded as a third-party beneficiary of
        the Agreement, except as otherwise provided in the Agreement.
      </Section>
      <Section>
        i) <strong>Survival.</strong> Any term of the Agreement that
        contemplates performance after termination will survive expiration or
        termination and continue until fully satisfied.
      </Section>
      <Section>
        j) <strong>System Availability.</strong> You understand that as part of
        scheduled maintenance and other planned downtime events, as well as
        certain events outside of our direct control resulting in unplanned
        downtime events, your access to the Software and Services, hosted by
        either us or you, may be partially or completely restricted.
      </Section>
      <Section>
        k) <strong>Versioning.</strong> We shall only support the most recent
        version of its Software.
      </Section>
      <Section>
        l) <strong>Anti-Kickback Statute.</strong> The Parties to the Agreement
        certify that this Agreement and any payments made, or items or services
        provided hereunder were determined in a manner that does not take into
        account the volume or value of referrals or business generated between
        the Parties. The Parties agree that this Agreement and their
        relationship is intended to comply with 42 U.S.C. Section 1320a-7b,
        commonly referred to as the Anti-Kickback Statute.
      </Section>
      <Section>
        m) <strong>Injunctive Relief.</strong> The Parties agree that, in the
        event of any breach of any of the covenants and agreements set forth in
        the Agreement, the non-breaching Party would encounter extreme
        difficulty in attempting to prove the actual amount of damages suffered
        by it as a result of such breach and would not have adequate remedy at
        law in such event. The Parties therefore agree that, in addition to any
        other remedy available at law or in equity, in the event of such breach,
        the non-breaching Party shall be entitled to seek and receive specific
        performance and temporary, preliminary and permanent injunctive relief
        from violation of any of said covenants and agreements from any court of
        competent jurisdiction without necessity of proving the amount of any
        actual damage resulting from such breach and without the necessity to
        post a bond or other security.
      </Section>
      <Section>
        n) <strong>Prior Agreements.</strong> If, prior to the Effective Date,
        you purchased or licensed from us, or any of our predecessors or
        affiliates, software, services or other products pursuant to any license
        agreement(s) or similar contract(s) (such agreement(s) being the “Prior
        Agreement”): (i) All Prior Agreements are hereby terminated as of the
        Effective Date and are of no further effect and this Agreement governs
        the entirety of the Parties’ relationship at all times, provided that
        obligations for payments not yet made and obligations of confidentiality
        shall survive termination of the Prior Agreement.
      </Section>
      <Section>
        o) <strong>Publicity.</strong> Neither Party will issue any press
        release or other voluntary public communication regarding this
        Agreement, or the relationship described by this Agreement without
        giving the other Party an opportunity to review and comment upon such
        communication and obtaining the written consent of the other Party.
        Notwithstanding the foregoing sentence, during the term of this
        Agreement, we may identify you publicly as our customer in press
        releases, on its website, or otherwise, and you may identify us publicly
        as a vendor of yours in press releases, on its website, or otherwise,
        provided that such identification does not reveal any terms of this
        Agreement beyond the basic nature of the services provided and does not
        mischaracterize the relationship.
      </Section>
      <Section>
        p) <strong>Export.</strong> You shall comply fully with all relevant
        export laws and regulations of the United States to ensure that the
        Protected Materials are not exported, directly or indirectly, in
        violation of United States law.
      </Section>
      <Section>
        q) <strong>Entire Agreement.</strong> The TOU, including all applicable
        attachments and amendments, constitutes the entire agreement between the
        Parties relating to this subject matter and supersedes all prior or
        simultaneous understandings, representations, discussions, negotiations,
        and agreements, whether written or oral.
      </Section>
      <Section>
        r) <strong>No Third-party Beneficiaries.</strong> The Agreement is for
        the benefit of the Parties and their successors and permitted assigns
        and does not confer any rights or benefits on any third party, including
        any employee of a Party, any customer of a Party, or any employee of a
        customer of a Party.
      </Section>
      <Section>
        s) <strong>Waiver of Jury Trial.</strong> Each Party irrevocably and
        unconditionally waives, to the fullest extent permitted by applicable
        law, any right it may have to a trial by jury in any legal action,
        proceeding, cause of action, or counterclaim arising out of or relating
        to the Agreement.
      </Section>
      <Section>
        t) <strong>Class Action Waiver.</strong> The Parties agree that any
        litigation arising out of or relating to the Agreement may only be
        maintained on an individual basis, and any right to pursue any claims
        arising out of or relating to this Agreement may not consolidate more
        than one Party’s individual claims or be raised on behalf of a class of
        Parties.
      </Section>
      <Section>
        u) <strong>Governing Law and Venue; Attorney’s Fees.</strong> The
        Agreement shall be governed by and construed in accordance with the laws
        of the State of Texas, without giving effect to its principles of
        conflict of laws. Any dispute shall be litigated in the appropriate
        complex business litigation division of the state or federal courts
        located in or encompassing, as the case may be, Bell County, Texas, to
        whose exclusive jurisdiction the Parties hereby consent. In any court
        action governed by this section, the prevailing party will be entitled
        to its costs and reasonable attorney’s fees, in addition to any other
        relief to which that party may be entitled.
      </Section>
      <Section>
        v) <strong>AMA Supplemental License Terms.</strong> If the Software and
        Services provided hereunder incorporate Current Procedural Terminology
        (CPT) content, you agree to the terms set forth in the AMA Supplemental
        License Terms.
      </Section>
    </Layout>
  );
}
